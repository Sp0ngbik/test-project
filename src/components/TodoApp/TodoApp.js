import { Input, Form, Button, Checkbox } from "antd";
import { useEffect, useState } from "react";
import style from "./style.module.scss";

const TodoApp = () => {
  const [arrList, setArrList] = useState([]);
  const [list, setList] = useState("");
  const [listEdit, setListEdit] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("arrList");
    const loadData = JSON.parse(data);

    if (loadData) {
      setArrList(loadData);
    }
  }, []);

  useEffect(() => {
    const data = JSON.stringify(arrList);
    localStorage.setItem("arrList", data);
  }, [arrList]);

  const funcForList = () => {
    const objOfList = {
      id: Math.random() * 900,
      title: list,
      isDone: false,
    };
    setArrList([...arrList].concat(objOfList));
  };
  console.log(arrList);
  const editTodo = (id) => {
    const edit = [...arrList].map((list) => {
      if (list.id === id) {
        list.title = editText;
      }
      return list;
    });
    setArrList(edit);
    setListEdit(null);
    setEditText("");
  };
  const deleteTodo = (id) => {
    const updTodos = [...arrList].filter((list) => list.id !== id);
    setArrList(updTodos);
  };

  const todoComplete = (id) => {
    const updTodos = [...arrList].map((list) => {
      if (list.id === id) {
        list.isDone = !list.isDone;
      }
      return list;
    });

    setArrList(updTodos);
  };
  return (
    <div className={style.toDoApp}>
      <Form onFinish={funcForList}>
        <Form.Item>
          <Input
            className={style.listToDo}
            onChange={(el) => {
              return setList(el.target.value);
            }}
            value={list}
          ></Input>
          <Button htmlType="submit">send</Button>
        </Form.Item>
      </Form>
      {arrList.map((list) => {
        return (
          <div key={list.id}>
            <Checkbox
              checked={list.isDone}
              onChange={() => todoComplete(list.id)}
            ></Checkbox>
            {listEdit === list.id ? (
              <div>
                <Input
                  className={style.listToDo}
                  onChange={(e) => setEditText(e.target.value)}
                  value={editText}
                />
              </div>
            ) : (
              list.title
            )}
            {listEdit === list.id ? (
              <Button onClick={() => editTodo(list.id)}>Submit edits</Button>
            ) : (
              <Button onClick={() => setListEdit(list.id)}>Edit</Button>
            )}

            <Button
              onClick={() => {
                return deleteTodo(list.id);
              }}
            >
              Delete
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default TodoApp;
