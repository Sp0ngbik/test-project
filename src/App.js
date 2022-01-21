import { Route, Routes } from "react-router-dom";
import TodoList from "./components/TodoList/TodoList";
import InProgress from "./components/TodoList/InProgress/InProgress";
import Completed from "./components/TodoList/Completed/Completed";

function App() {
  return (
    <div>
      {/* <TodoList /> */}
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/in-progress" element={<InProgress />} />
        <Route path="/completed" element={<Completed />} />
      </Routes>
    </div>
  );
}

export default App;
