import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DataInterface } from "../model/DataInterface";
import axios, { AxiosResponse, HttpStatusCode } from "axios";

interface DataInterfaceState {
    loading: boolean // Yüklenme durumunu kontrol etmek için
    data: DataInterface[] // Veriyi Almak için
}

const initialState: DataInterfaceState = {
    loading: true, // Varsayılan olarak false geliyor
    data: [] // Varsayılan olarak boş geliyor
}

interface RequestParams {
    method: string; // HTTP yöntemi (POST, PUT, DELETE, vb.)
    data?: DataInterface; // Gönderilecek veri (eğer varsa)
    id?: string; // Eğer güncelleme veya silme işlemi yapılacaksa, id gerekebilir
}

export const performOperation = createAsyncThunk(
    'post/put/delete/catfact',
    async (params: RequestParams, { dispatch }): Promise<[DataInterface]> => {
        const { method, data, id } = params;
        let url = "http://localhost:3000/api/v1/todo";

        if (id) {
            url += `/${id}`;
        }

        try {
            let response: AxiosResponse;
            if (method === 'GET') {
                response = await axios.get(url);
            } else if (method === 'POST') {
                response = await axios.post(url, data);
            } else if (method === 'PUT') {
                response = await axios.put(url, data);
            } else if (method === 'DELETE') {
                response = await axios.delete(url);
            } else {
                throw new Error('Invalid method');
            }

            const responseData = response.data;

            // Eğer işlem başarılıysa ve GET isteği yapılması gerekiyorsa
            if (response.status === 200 && (method === 'POST' || method === 'PUT' || method === 'DELETE')) {
                dispatch(performOperation({ method: 'GET' })); // Verileri yeniden al
            }

            return responseData;
        } catch (error: any) {
            // Hata durumunda hatayı fırlat
            throw new Error(`API error: ${error.message}`);
        }
    }
);


export const updateTodo = createAsyncThunk(
    'todos/updateTodo',
    async (data: DataInterface, { dispatch, getState }): Promise<DataInterface[]> => {
        try {
            const response = await axios.put(`http://localhost:3000/api/v1/todo/${data.id}`, data);
            if (response.status === HttpStatusCode.Ok) {
                console.log('Güncellendi');
                // Güncelleme işlemi başarılı olduğunda Redux store'daki tüm verileri al
                const allData = await dispatch(performOperation({ method: 'GET' }));
                return allData.payload as DataInterface[]; // Tüm verileri döndür
            } else {
                console.log('Güncellenirken Bir Hata Oluştu');
                throw new Error('Güncelleme sırasında bir hata oluştu.');
            }
        } catch (error: any) {
            console.error('Güncelleme hatası:', error);
            throw new Error(`Error updating todo: ${error.message}`);
        }
    }
);

export const addTodo = createAsyncThunk(
    'todos/addTodo',
    async (data: DataInterface, { dispatch, getState, rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:3000/api/v1/todo', data);
            if (response.status === HttpStatusCode.Created) {
                console.log('Veri Eklendi');
                // Ekleme işlemi başarılı olduğunda Redux store'daki tüm verileri al
                const allData = await dispatch(performOperation({ method: 'GET' }));
                return allData.payload as DataInterface[]; // Tüm verileri döndür
            } else {
                console.log('Ekleme sırasında bir hata oluştu');
                return rejectWithValue('Ekleme sırasında bir hata oluştu.');
            }
        } catch (error: any) {
            console.error('Ekleme hatası:', error);
            return rejectWithValue(`Veri eklenirken bir hata oluştu: ${error.message}`);
        }
    }
);

export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async (id: number, { dispatch, getState }): Promise<DataInterface[]> => {
        try {
            const response = await axios.put(`http://localhost:3000/api/v1/todo/${id}`);
            if (response.status === HttpStatusCode.Ok) {
                console.log('Veri Silindi');
                // Güncelleme işlemi başarılı olduğunda Redux store'daki tüm verileri al
                const allData = await dispatch(performOperation({ method: 'GET' }));
                return allData.payload as DataInterface[]; // Tüm verileri döndür
            } else {
                console.log('Güncellenirken Bir Hata Oluştu');
                throw new Error('Güncelleme sırasında bir hata oluştu.');
            }
        } catch (error: any) {
            console.error('Güncelleme hatası:', error);
            throw new Error(`Error updating todo: ${error.message}`);
        }
    }
);


export const todoSlice = createSlice({
    name: "todoSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(performOperation.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(performOperation.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
        });
        builder.addCase(performOperation.rejected, (state) => {
            console.log(`Error`);
            state.loading = false;
        });

        // Yeni eklenen ekstra reducer için:
        builder.addCase(updateTodo.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateTodo.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
        });
        builder.addCase(updateTodo.rejected, (state) => {
            console.log(`Error updating todo`);
            state.loading = false;
        });

        builder.addCase(addTodo.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addTodo.fulfilled, (state, action) => {
            state.data = action.payload; // Tüm verileri güncelle
            state.loading = false;
        });
        builder.addCase(addTodo.rejected, (state) => {
            console.log(`Error adding todo`);
            state.loading = false;
        });
    }
});

export default todoSlice.reducer;