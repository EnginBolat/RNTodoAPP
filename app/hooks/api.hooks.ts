import axios, { HttpStatusCode } from "axios";
import { DataInterface } from "../model/DataInterface"

export async function addTodoService(title: string, desc: string, createdDate: string) {
    try {
        const response = await axios.post(`http://localhost:3000/api/v1/todo/`, {
            title: title,
            description: desc,
            createdDate: createdDate,
            isDone: false
        });
        if (response.status === HttpStatusCode.Created) {
            console.log('Data Added In Service')
            console.log(response.data);
        }
    } catch (error) {
        console.error("Data Can't Added:", error);
    }
}
