import { useState } from "react";
import "./App.css";
import IsDoneSelector from "./components/IsDoneSelector";
import TodoList from "./components/TodoList";

export enum TodoFilterByEnum {
  all = "All",
  done = "Done",
  pending = "Pending",
}
function App() {
  const [selectedFilter, setSelectedFilter] = useState<TodoFilterByEnum>(
    TodoFilterByEnum.all
  );

  return (
    <>
      <div className="bg-sky-900 p-4 min-h-screen">
        <IsDoneSelector
          onSelectDone={(selected) => setSelectedFilter(selected)}
        />
        <TodoList selectedFilter={selectedFilter} />
      </div>
    </>
  );
}

export default App;
