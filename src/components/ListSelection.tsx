import { FormEvent, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import useLists from "../hooks/useLists";
import listService, { List } from "../services/listService";

interface Props {
  onSelectList: (id: number) => void;
}
const ListSelection = ({ onSelectList }: Props) => {
  const { lists, error, isLoading, setLists, setError } = useLists();
  const listRef = useRef<HTMLInputElement>(null);

  const onAddlist = (list: List) => {
    const originalLists = [...lists];

    setLists([list, ...lists]);

    listService
      .addList(list)
      .then(({ data: savedlist }) => setLists([savedlist, ...lists]))
      .catch((err) => {
        setError(err.message);
        setLists(originalLists);
      });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (listRef.current !== null) {
      onAddlist({ title: listRef.current.value, id: uuidv4() });
      listRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-2 justify-center absolute inset-0 sm:top-1/2 p-5 sm:flex-row">
      {error && <p>{error}</p>}
      {isLoading && <h2>Loading ...</h2>}
      {lists.map((list) => (
        <button
          key={list.id}
          className="bg-slate-100 h-fit w-full p-5 rounded-xl"
          onClick={() => onSelectList(parseInt(list.id))}
        >
          {list.title}
        </button>
      ))}
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          className="bg-slate-100 h-fit w-full p-5 rounded-xl text-center sm:w-max"
          ref={listRef}
          type="text"
          placeholder="Add new list"
        />
      </form>
    </div>
  );
};

export default ListSelection;
