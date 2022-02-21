import { useSelector } from "react-redux";

import "./footer.css";
import { totalTodo, totalSelectedTodo } from "./todoSlice";

const Footer = () => {
    const total = useSelector(totalTodo);

    const totalSelected = useSelector(totalSelectedTodo);

    return (
        <div className="footer">
            <div className="completed-todo">
                <span>
                    <span>Todo selected : </span>
                    {totalSelected}
                </span>
            </div>
            <div className="unCompleted-todo">
                <span>
                    <span>Total : </span>
                    {total}
                </span>
            </div>
        </div>
    );
};

export default Footer;
