import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./header.css";
import { addNewTodo } from "./todoSlice";

const Header = () => {
    const [title, setTitle] = useState("");
    const [error, setError] = useState(false);
    const loading = useSelector((state) => state.todo.status);

    const dispatch = useDispatch();

    const onAddNewTodo = (e) => {
        e.preventDefault();
        let value = e.target[0].value;
        if (value.length < 4 || value.length > 50) {
            e.target[0].style.borderBottom = " 1.6px solid red";
            return setError(true);
        }
        dispatch(addNewTodo(title));
        setTitle("");
    };

    function onChangeHandler(e) {
        let value = e.target.value;
        if (error && value.length >= 4 && value.length <= 50) {
            e.target.style.borderBottom = "0.8px solid gray";
            setError(false);
        }
        setTitle(value);
    }

    function onBlurHandler(e) {
        if (e.target.value.length < 4 || e.target.value.length > 50) {
            setError(true);
            e.target.style.borderBottom = "1.6px solid red";
        }
    }

    return (
        <div className="header">
            <div className="header-title-container">
                <span className="header-title">To do app</span>
            </div>

            <div className="new-todo-container">
                <form className="new-todo-input-form" onSubmit={onAddNewTodo}>
                    <div className="new-todo-input-container">
                        {error && (
                            <span className="error-message">
                                Title must be between 4 and 50 characters.
                            </span>
                        )}
                        <input
                            name="title"
                            type="text"
                            placeholder="New todo"
                            value={title}
                            onChange={onChangeHandler}
                            onBlur={onBlurHandler}
                            className="new-todo"
                        />
                    </div>
                    <div className="new-todo-btn-container">
                        {loading === "loading" && (
                            <div className="spinner-border spinner-border-sm text-danger loading" />
                        )}
                        <input
                            disabled={loading === "loading" ? true : false}
                            type="submit"
                            className="new-todo-btn"
                            value={"Add new todo"}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Header;
