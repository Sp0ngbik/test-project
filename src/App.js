import { Route, Routes } from "react-router-dom";
import TodoList from "./components/TodoList/TodoList";
import InProgress from "./components/TodoList/InProgress/InProgress";
import Completed from "./components/TodoList/Completed/Completed";
import { useState } from "react";

function App() {
  const [completedElements, setCompletedElements] = useState([]);
  const [allElements, setAllElements] = useState([]);
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <TodoList
              stateApp={{
                completedElements: completedElements,
                setCompletedElements: setCompletedElements,
                allElements: allElements,
                setAllElements: setAllElements,
              }}
            />
          }
        />
        <Route
          path="/in-progress"
          element={
            <InProgress
              stateApp={{
                completedElements: completedElements,
                setCompletedElements: setCompletedElements,
                allElements: allElements,
                setAllElements: setAllElements,
              }}
            />
          }
        />
        <Route
          path="/completed"
          element={
            <Completed
              stateApp={{
                completedElements: completedElements,
                setCompletedElements: setCompletedElements,
                allElements: allElements,
                setAllElements: setAllElements,
              }}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
