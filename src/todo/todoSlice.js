import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    status: "idle", // I have loading status for creating new todo
    loading: "idle", //and fetching todo
    error: null,
    todos: [],
};

const endpoint = "http://192.168.43.240:3000/todo";

export const addNewTodo = createAsyncThunk("todo/addNewTodo", async (title) => {
    const response = await axios({
        method: "POST",
        url: endpoint,
        data: { title: title },
    });
    return response.data;
});

export const fetchTodo = createAsyncThunk("todo/fetchTodo", async () => {
    const response = await fetch(endpoint);
    const result = await response.json();
    return result;
});

export const toggleStatus = createAsyncThunk(
    "todo/toggleStatus",
    async (id) => {
        const response = await axios({
            method: "PUT",
            url: endpoint + "/" + id,
        });

        return response.data;
    }
);

export const deleteTodo = createAsyncThunk("todo/deleteTodo", async (id) => {
    const response = await axios({
        url: endpoint + "/" + id,
        method: "DELETE",
    });

    return response.data;
});

export const deleteMultiTodo = createAsyncThunk(
    "todo/deleteMultiTodo",
    async (_, { getState }) => {
        const { todo } = getState();
        const selectedTodo = todo.todos.filter((td) => td.selected === true);
        const response = await axios({
            url: endpoint,
            method: "DELETE",
            data: { selectedTodo },
        });

        return response.data;
    }
);

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        selectAllTodo(state, action) {
            const { isChecked, todoIds } = action.payload;
            const idArrayLength = todoIds.length;
            if (idArrayLength === 0) return;

            for (let i = 0; i < idArrayLength; i++) {
                const todo = state.todos.find((td) => td._id === todoIds[i]);

                if (!todo) return todo;
                todo.selected = isChecked;
            }
        },

        toggleTodo(state, action) {
            const todo = state.todos.find(
                (todo) => todo._id === action.payload
            );
            if (!todo) return todo;

            todo.selected = !todo.selected;
        },
    },

    extraReducers(builder) {
        builder
            .addCase(addNewTodo.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addNewTodo.fulfilled, (state, action) => {
                state.status = "loaded";
                state.todos.push(action.payload);
            })
            .addCase(addNewTodo.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });

        builder
            .addCase(fetchTodo.pending, (state) => {
                state.loading = "loading";
            })
            .addCase(fetchTodo.fulfilled, (state, action) => {
                state.loading = "loaded";
                state.todos = action.payload;
            })
            .addCase(fetchTodo.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.error.message;
            });

        builder
            .addCase(toggleStatus.fulfilled, (state, action) => {
                const { _id, selected } = action.payload;
                const todo = state.todos.find((td) => td._id === _id);

                todo.selected = selected;
            })
            .addCase(toggleStatus.rejected, (state, action) => {
                state.error = action.error.message;
            });

        builder.addCase(deleteMultiTodo.fulfilled, (state, action) => {
            const todos = action.payload;
            for (let i = 0; i < todos.length; i++) {
                const index = state.todos.findIndex(
                    (todo) => todo._id === todos[i]._id
                );

                state.todos.splice(index, 1);
            }
        });

        builder
            .addCase(deleteTodo.pending, (state) => {
                state.loading = "loading";
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                const { _id } = action.payload;
                const index = state.todos.findIndex((td) => td._id === _id);
                state.loading = "loaded";

                state.todos.splice(index, 1);
            })

            .addCase(deleteTodo.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.error.message;
            });
    },
});

export const status = (state) => state.todo.status;
export const loading = (state) => state.todo.loading;
export const error = (state) => state.todo.error;

export const totalSelectedTodo = (state) => {
    const idNum = state.todo.todos.filter((todo) => todo.selected === true);
    return idNum.length;
};

export const totalTodo = (state) => {
    const total = state.todo.todos;
    return total.length;
};

export const { toggleTodo, selectAllTodo } = todoSlice.actions;
export default todoSlice.reducer;
