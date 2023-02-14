import axios, { AxiosRequestConfig } from 'axios';
import { Session } from '../App';

const API_URL = "http://localhost:5000";

export interface IUser {
    user_id: number,
    email: string, 
    handle: string,
    role: number,
    updatedDate: Date,
    createdDate: Date,
    deletedDate: Date,
};

export const GetLocalUser = async ({ access_token }: Session): Promise<IUser | null> => {
    const config: AxiosRequestConfig = {
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    };
    const response = await axios.get(`${API_URL}/api/users/local`, config);
    if(response.status === 200)
        return response.data;
    else
        return null;
}

export const Authenticate = async (email: string, password: string): Promise<string | null> => {
    const data = {
        email: email,
        password: password,
    };
    try{
        const response = await axios.post(`${API_URL}/auth/login`, data);
        if(response.status === 201)
            return response.data.access_token;
        else
            return null;
    } catch(e){
        console.log(e);
        return null;
    }
}