import { Button, Input, Form } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import Completed from "./Completed/Completed";
import InProgress from "./InProgress/InProgress";
import style from "./style.module.scss";

const TodoList = (props) => {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [editTodo, setEditTodo] = useState(null);
  const [editText, setEditText] = useState("");
  useEffect(() => {
    const localData = localStorage.getItem("todos");
    const saveData = JSON.parse(localData);
    if (saveData) {
      setTodos(saveData);
    }
  }, []);

  useEffect(() => {
    const data = JSON.stringify(todos);
    localStorage.setItem("todos", data);
  }, [todos]);

  const addList = () => {
    const objList = {
      id: Math.random() * 200,
      title: todoText,
      isDone: false,
    };
    setTodos([...todos].concat(objList));
  };
  const todoIsDone = (id) => {
    const todoUpd = [...todos].map((todoText) => {
      if (todoText.id === id) {
        todoText.isDone = !todoText.isDone;
      }
      return todoText;
    });

    setTodos(todoUpd);
  };

  const deleteTodoFunc = (id) => {
    const todoUpd = [...todos].filter((todoText) => todoText.id !== id);
    setTodos(todoUpd);
  };
  const changeTodo = (id) => {
    const edit = [...todos].map((todoText) => {
      if (todoText.id === id) {
        todoText.title = editText;
      }
      return todoText;
    });
    setTodos(edit);
    setEditTodo(null);
    setEditText("");
  };

  // el.isDone|| buttonSwitcher === 2 ? <Completed info={el.title} /> : null&&
  // !el.isDone||buttonSwitcher === 3 ? <InProgress info={el.title} /> : null;
  return (
    <div className={style.container}>
      <div>
        <Link to="/">
          <Button onClick={() => {}}>Back</Button>
        </Link>
        <Link to="/in-progress">
          <Button>In Progress</Button>
        </Link>

        <Link to="/completed">
          <Button>Completed</Button>
        </Link>
      </div>
      <Form onFinish={addList}>
        <Form.Item name="list">
          <Input
            placeholder="type your todo"
            value={todoText}
            onChange={(event) => setTodoText(event.target.value)}
          />
        </Form.Item>
        <Button htmlType="submit">confirm</Button>
        {todos.map((todoText) => {
          return (
            <div key={todoText.id}>
              <div className={todoText.isDone ? style.done : style.normal}>
                <Checkbox
                  checked={todoText.isDone}
                  onChange={() => todoIsDone(todoText.id)}
                />
                {editTodo === todoText.id ? (
                  <div>
                    <Input
                      onChange={(ev) => setEditText(ev.target.value)}
                      value={editText}
                    />
                  </div>
                ) : (
                  todoText.title
                )}
                {editTodo === todoText.id ? (
                  <Button onClick={() => changeTodo(todoText.id)}>
                    Submit edits
                  </Button>
                ) : (
                  <Button onClick={() => setEditTodo(todoText.id)}>Edit</Button>
                )}
                <Button
                  onClick={() => {
                    return deleteTodoFunc(todoText.id);
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          );
        })}
        {/* <InProgress name="Vlad" /> */}
      </Form>
    </div>
  );
};

export default TodoList;

//Попробовать сделать как в слайдере, через изменеие стейта менять страницу с отрисовкой
