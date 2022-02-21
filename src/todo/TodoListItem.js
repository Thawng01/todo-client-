import "./todolistitem.css";

import { useDispatch, useSelector } from "react-redux";
import { IoTrashOutline } from "react-icons/io5";

import { toggleTodo, deleteTodo } from "./todoSlice";

const selectTodoById = (state, todoId) =>
    state.todo.todos.find((todo) => todo._id === todoId);

const TodoListItem = ({ id }) => {
    const dispatch = useDispatch();

    const todo = useSelector((state) => selectTodoById(state, id));

    function onToggleTodo(id) {
        dispatch(toggleTodo(id));
    }

    function onDeleteTodo(id) {
        dispatch(deleteTodo(id));
    }

    return (
        <li className="todos">
            <div className="todo-item-container">
                <div className="completed">
                    {/* use bootstrap for checkbox */}
                    <input
                        type="checkbox"
                        className="form-check-input"
                        checked={todo.selected === true ? true : false}
                        onChange={() => onToggleTodo(todo._id)}
                    />
                </div>

                <span className="todo-item">{todo?.title}</span>
            </div>
            <div className="todo-actions">
                <div className="todo-actions-container">
                    <IoTrashOutline
                        onClick={() => onDeleteTodo(todo._id)}
                        className="todo-delete-icon"
                    />
                </div>
            </div>
        </li>
    );
};

export default TodoListItem;
