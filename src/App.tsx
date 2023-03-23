import { useEffect, useState } from "react";
import "./App.css";
import IsDoneSelector from "./components/IsDoneSelector";
import ListSelection from "./components/ListSelection";
import SearchInput from "./components/SearchInput";
import TodoList from "./components/TodoList";

export enum TodoFilterByEnum {
  all = "All",
  done = "Done",
  pending = "Pending",
}

function App() {
  const [listId, setListId] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<TodoFilterByEnum>(
    TodoFilterByEnum.all
  );

  const onSelectList = (id: number) => {
    setListId(id);
  };

  return (
    <>
      <button
        onClick={() => setListId(0)}
        className="absolute left-5 top-20 bg-blue-500 text-white rounded-xl  hover:bg-green-500 focus:outline-none py-2 px-4 flex items-center justify-center"
      >
        Go back to lists
      </button>
      <div className="bg-sky-900 p-4 min-h-screen">
        {!listId && <ListSelection onSelectList={onSelectList} />}
        {listId && (
          <>
            <div className="flex gap-5 mb-10">
              <SearchInput
                onSearch={(searchText) => setSearchQuery(searchText)}
              />
              <IsDoneSelector
                onSelectDone={(selected) => setSelectedFilter(selected)}
              />
            </div>
            <TodoList
              listId={listId}
              selectedFilter={selectedFilter}
              searchQuery={searchQuery}
            />
          </>
        )}
      </div>
    </>
  );
}

export default App;
