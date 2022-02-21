import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./multitodoactions.css";

import { selectAllTodo, deleteMultiTodo, totalSelectedTodo } from "./todoSlice";

const MultiTodoActions = ({ todoIds }) => {
    const [checked, setChecked] = useState(false);
    const dispatch = useDispatch();

    const total = useSelector(totalSelectedTodo);

    function onSelectAllTodo(e) {
        const isChecked = e.target.checked;
        setChecked(isChecked);
        dispatch(selectAllTodo({ isChecked, todoIds }));
    }

    function onDeleteMultiTodo() {
        dispatch(deleteMultiTodo());
        setChecked(false);
    }

    const disabled = total > 1 || checked ? false : true;

    return (
        <div className="select-all-container">
            <div>
                <input
                    type="checkbox"
                    className="form-check-input"
                    onChange={(e) => onSelectAllTodo(e)}
                    checked={checked}
                />
                <span className="select-all-label">Select all</span>
            </div>
            <button
                style={{
                    backgroundColor: disabled === false ? "red" : "#f0f0f0",
                    color: disabled === false ? "#fff" : "",
                    cursor: disabled === false ? "pointer" : "",
                }}
                className="multi-delete-btn"
                onClick={onDeleteMultiTodo}
                disabled={disabled}
            >
                Delete
            </button>
        </div>
    );
};

export default MultiTodoActions;
