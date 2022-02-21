import Todo from "./todo/Todo";
import { Provider } from "react-redux";
import store from "./todo/store";

function App() {
    return (
        <Provider store={store}>
            <Todo />
        </Provider>
    );
}

export default App;
