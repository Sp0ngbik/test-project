import { Button, Input, Form } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { useState } from "react";
import { Link } from "react-router-dom";
import style from "./style.module.scss";

const TodoList = ({ stateApp }) => {
  const [listEdit, setListEdits] = useState("");
  const [edits, setEdits] = useState("");
  const deleteTodo = (id) => {
    const del = [...stateApp.allElements].filter((list) => list.id !== id);
    stateApp.setAllElements(del);
  };
  const editFunc = (id) => {
    const changedTodo = [...stateApp.allElements].map((el) => {
      if (el.id === id) {
        el.title = edits;
      }
      return el.title;
    });
    setListEdits("");
    setEdits(changedTodo);
  };
  return (
    <div className={style.mainBlock}>
      <Form
        onFinish={(el) => {
          stateApp.setAllElements((prev) => {
            let data = [...prev];
            data.push({
              checked: false,
              title: el.title,
              id: data.length === 0 ? 1 : data.length + 1,
            });

            return data;
          });
        }}
      >
        <Form.Item name="title">
          <Input />
        </Form.Item>
        <Button htmlType="submit">Submit</Button>
      </Form>
      <Link to="/in-progress">
        <Button>In progress</Button>
      </Link>
      <Link to="/completed">
        <Button>completed</Button>
      </Link>
      <div>
        {stateApp.allElements.map((el) => {
          return (
            <div className={style.listBlock} key={el.id}>
              <Checkbox
                onChange={(e) => {
                  if (e.target.checked) {
                    stateApp.setCompletedElements((prev) => {
                      let data = [...prev];
                      data.push({
                        checked: true,
                        title: el.title,
                        id: data.length + 1,
                      });

                      return data;
                    });
                    stateApp.setAllElements((prev) => {
                      let data = [...prev];
                      for (let i = 0; i < data.length; i++) {
                        let elem = data[i];
                        if (elem.id === el.id) {
                          elem.checked = true;
                        }
                      }
                      return data;
                    });
                  }
                }}
              />
              {el.id === listEdit ? (
                <Input
                  value={edits}
                  onChange={(e) => {
                    setEdits(e.target.value);
                  }}
                />
              ) : (
                el.title
              )}
              {el.id === listEdit ? (
                <Button onClick={() => editFunc(el.id) || setEdits("")}>
                  Submit edits
                </Button>
              ) : (
                <Button onClick={() => setListEdits(el.id)}>Edit</Button>
              )}
              <Button
                onClick={() => {
                  deleteTodo(el.id);
                }}
              >
                Delete
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TodoList;
