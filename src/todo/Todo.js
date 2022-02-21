import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { fetchTodo } from "./todoSlice";
import Header from "./Header";
import "./todo.css";
import TodoList from "./TodoList";
import Footer from "./Footer";

const Todo = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodo());
    }, []);

    return (
        <div className="todo">
            <Header />
            <TodoList />
            <Footer />
        </div>
    );
};

export default Todo;
