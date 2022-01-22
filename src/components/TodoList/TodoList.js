import { Button, Input, Form } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { Link } from "react-router-dom";
import style from "./style.module.scss";

const TodoList = ({ stateApp }) => {
  return (
    <div>
      <Form
        onFinish={(el) => {
          stateApp.setAllElements((prev) => {
            let test = [...prev];
            test.push({
              checked: false,
              title: el.title,
              id: test.length === 0 ? 1 : test.length + 1,
            });
            console.log(test);
            console.log(test.length);
            return test;
          });
        }}
      >
        <Form.Item name="title">
          <Input />
        </Form.Item>
        <Button htmlType="submit">Submit</Button>
      </Form>
      <Button
        onClick={() => {
          console.log(stateApp.sendInfo);
        }}
      >
        todos
      </Button>

      <Link to="/in-progress">
        <Button>In progress</Button>
      </Link>
      <Link to="/completed">
        <Button>completed</Button>
      </Link>
      <div>
        {stateApp.allElements.map(
          (el) => {
            // if (el.title) {
            return (
              <div key={el.id}>
                <Checkbox
                  onChange={(e) => {
                    if (e.target.checked) {
                      stateApp.setCompletedElements((prev) => {
                        let test = [...prev];
                        test.push({
                          checked: true,
                          title: el.title,
                          id: test.length + 1,
                        });

                        return test;
                      });
                      stateApp.setAllElements((prev) => {
                        let test = [...prev];
                        for (let i = 0; i < test.length; i++) {
                          let elem = test[i];
                          if (elem.id === el.id) {
                            elem.checked = true;
                          }
                        }
                        return test;
                      });
                    }
                  }}
                />

                {el.title}
                {/* <Button
                  onClick={() => {
                    stateApp.allElements.id =
                      el.id &&
                      stateApp.allElements.map((el) => {
                        return (el.title = null);
                      });
                  }}
                >
                  Delete
                </Button> */}
              </div>
            );
          }
          // else {
          // return stateApp.allElements.id;
          // }
          // }
        )}
      </div>
    </div>
  );
};

export default TodoList;
