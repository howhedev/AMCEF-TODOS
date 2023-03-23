import { useState } from "react";
import "./App.css";
import IsDoneSelector from "./components/IsDoneSelector";
import SearchInput from "./components/SearchInput";
import TodoList from "./components/TodoList";

export enum TodoFilterByEnum {
  all = "All",
  done = "Done",
  pending = "Pending",
}

// export interface FilterQuery {
//   state: TodoFilterByEnum;
//   searchText: string;
// }

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<TodoFilterByEnum>(
    TodoFilterByEnum.all
  );

  return (
    <>
      <div className="bg-sky-900 p-4 min-h-screen">
        <div className="flex gap-5 mb-10">
          <SearchInput onSearch={(searchText) => setSearchQuery(searchText)} />
          <IsDoneSelector
            onSelectDone={(selected) => setSelectedFilter(selected)}
          />
        </div>
        <TodoList selectedFilter={selectedFilter} searchQuery={searchQuery} />
      </div>
    </>
  );
}

export default App;
