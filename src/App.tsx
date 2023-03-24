import { useState } from "react";
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
  const [listTitle, setListTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<TodoFilterByEnum>(
    TodoFilterByEnum.all
  );

  return (
    <>
      <div className="bg-gradient-to-r from-cyan-800 to-sky-800 p-4 min-h-screen text-gray-900">
        {listId === 0 ? (
          <ListSelection
            onSelectList={(selectedList) => {
              setListId(selectedList.listId);
              setListTitle(selectedList.listTitle);
            }}
          />
        ) : (
          <>
            <div className="flex gap-5 mb-10">
              <button
                onClick={() => setListId(0)}
                className="bg-cyan-500 text-white font-semibold rounded-xl hover:opacity-80 py-2 px-4 flex items-center justify-center focus:outline-none focus-visible:ring focus-visible:ring-cyan-500 focus-visible:ring-opacity-75"
              >
                List Selection
              </button>
              <SearchInput
                onSearch={(searchText) => setSearchQuery(searchText)}
              />
              <IsDoneSelector
                onSelectDone={(selected) => setSelectedFilter(selected)}
              />
            </div>
            <TodoList
              listTitle={listTitle}
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
