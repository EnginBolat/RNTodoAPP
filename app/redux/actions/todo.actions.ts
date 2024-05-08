import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { HttpStatusCode } from "axios";

import { Todo } from "../../model";

export const fetchTodo = createAsyncThunk(
    'todos/all',
    async () => {
        try {
            const { data, status } = await axios.get('http://localhost:3000/api/v1/todo');
            if (status == HttpStatusCode.Ok) {
                return data;
            }
        } catch (error) {
            console.log(`Fetch Error : ${error}`);
            throw error;
        }
    }
)

export const addTodo = createAsyncThunk(
    'todos/addTodo',
    async (newData: Todo, { dispatch }) => {
        try {
            const { status } = await axios.post('http://localhost:3000/api/v1/todo', newData);
            if (status === HttpStatusCode.Created) {
                dispatch(fetchTodo())
            } else {
                console.log('Ekleme sırasında bir hata oluştu');
            }
        } catch (error: any) {
            console.log(`Ekleme Hatası: ${error}`);
            throw error;
        }
    }
);

export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async (id: number, { dispatch }) => {
        try {
            const { status } = await axios.delete(`http://localhost:3000/api/v1/todo/${id}`,);
            if (status === HttpStatusCode.Ok) {
                dispatch(fetchTodo())
            } else {
                console.log('Silme sırasında bir hata oluştu');
            }
        } catch (error: any) {
            console.log(`Silme Hatası: ${error}`);
            throw error;
        }
    }
);

export const updateTodo = createAsyncThunk(
    'todos/updateTodo',
    async (updatedModel: Todo) => {
        try {
            const { data, status } = await axios.put(`http://localhost:3000/api/v1/todo/${updatedModel.id}`, updatedModel)
            if (status == HttpStatusCode.Ok) {
                console.log(data);
            }
        } catch (error) {
            console.log(`Ekleme Hatası: ${error}`);
        }
    }
);