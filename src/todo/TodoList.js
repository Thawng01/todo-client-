import { useSelector, shallowEqual } from "react-redux";
import MultiTodoActions from "./MultiTodoActions";

import "./todolist.css";
import TodoListItem from "./TodoListItem";
import { error, loading } from "./todoSlice";

const TodoList = () => {
    const todoIds = useSelector(
        (state) => state.todo.todos.map((todo) => todo._id),
        shallowEqual
    );

    const isLoading = useSelector(loading);
    const err = useSelector(error);

    const renderedTodo = todoIds?.map((id) => {
        return <TodoListItem key={id} id={id} />;
    });

    let content;

    if (isLoading === "loading") {
        // use bootstrap for loading
        content = <div className="spinner-border text-danger"></div>;
    } else if (isLoading === "loaded") {
        content = renderedTodo;
    } else if (err !== null) {
        content = <span style={{ color: "red", fontSize: 20 }}>{err}</span>;
    }

    return (
        <div className="todo-list">
            <MultiTodoActions todoIds={todoIds} />
            <ul>{content}</ul>
        </div>
    );
};

export default TodoList;
