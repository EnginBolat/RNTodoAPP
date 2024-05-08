import { createSlice } from "@reduxjs/toolkit";

import { Todo } from "../../model";
import { addTodo, deleteTodo, fetchTodo } from "../actions";

interface initialStateInterface {
    loading: boolean
    data?: Todo[]
    error: string;
}

const initialState: initialStateInterface = {
    loading: true,
    data: undefined,
    error: '',
}

export const todoSlice = createSlice({
    name: "todoSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTodo.pending, (state) => {
            return ({ ...state, loading: true })
        });
        builder.addCase(fetchTodo.fulfilled, (state, action) => {
            return ({ ...state, loading: false, data: action.payload })
        });
        builder.addCase(fetchTodo.rejected, (state, action) => {
            return ({ ...state, loading: false, error: `${action.error.message}` })
        });
        builder.addCase(addTodo.pending, (state) => {
            return ({ ...state, loading: true })
        });
        builder.addCase(addTodo.fulfilled, (state) => {
            return ({ ...state, loading: false, })
        });
        builder.addCase(addTodo.rejected, (state, action) => {
            return ({ ...state, loading: false, error: `${action.error.message}` })
        });
        builder.addCase(deleteTodo.pending, (state) => {
            return ({ ...state, loading: true })
        });
        builder.addCase(deleteTodo.fulfilled, (state) => {
            return ({ ...state, loading: false, })
        });
        builder.addCase(deleteTodo.rejected, (state, action) => {
            return ({ ...state, loading: false, error: `${action.error.message}` })
        });
    }
});

export default todoSlice.reducer;