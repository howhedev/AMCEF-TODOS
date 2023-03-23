import useLists from "../hooks/useLists";

interface Props {
  onSelectList: (id: number) => void;
}
const ListSelection = ({ onSelectList }: Props) => {
  const { lists, error, isLoading, setLists, setError } = useLists();

  return (
    <div className="flex gap-10 justify-center h-screen w-screen">
      {error && <p>{error}</p>}
      {isLoading && <h2>Loading ...</h2>}
      {lists.map((list) => (
        <button
          key={list.id}
          className="bg-slate-100 w-fit h-fit self-center p-5 rounded-xl"
          onClick={() => onSelectList(list.id)}
        >
          {list.title}
        </button>
      ))}
    </div>
  );
};

export default ListSelection;
