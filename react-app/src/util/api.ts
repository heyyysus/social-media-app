import axios, { AxiosRequestConfig } from 'axios';
import { Session } from '../App';
import { PostCreationBody } from '../components/PostCreationForm';
import { RegistrationBody } from '../components/RegisterForm'

const API_URL = "http://localhost:5000";

export interface IUser {
    user_id: number,
    email: string, 
    handle: string,
    role: number,
    updatedDate: Date,
    createdDate: Date,
    deletedDate: Date,
    followers?: IUser[],
    following?: IUser[],
    likes?: IPost[],
};

export interface IPost {
    post_id: number,
    body: string,
    createdDate: Date,
    deletedDate: Date,
    updatedDate: Date, 
    user: IUser,
    likes: IUser[],
}

const GenerateConfig = ({ access_token }: Session) => {
    const config: AxiosRequestConfig = {
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    };
    return config;
}

export const GetFeed = async ({ access_token }: Session): Promise<IPost[]> => {
    const config = GenerateConfig({ access_token });
    const response = await axios.get(`${API_URL}/api/posts`, config);
    console.log(response);
    if(response.status === 200)
        return response.data;
    else
        return [];
}

export const GetLocalUser = async ({ access_token }: Session): Promise<IUser | null> => {
    const config = GenerateConfig({ access_token });
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

export const Register = async (registrationBody: RegistrationBody): Promise<IUser | null> => {
    try {
        const response = await axios.post(`${API_URL}/api/users`, registrationBody);
        console.log(response);
        if(response.status === 201)
            return response.data;
        else
            return null;
    } catch(e){
        console.log(e);
        return null;
    }
}

export const CreatePost = async (session: Session, postCreationBody: PostCreationBody): Promise<IPost | null> => {
    const config = GenerateConfig(session);
    try {
        const response = await axios.post(`${API_URL}/api/posts`, postCreationBody, config);
        console.log(response);
        if(response.status === 201)
            return response.data;
        else
            return null;
    }
    catch(e){
        console.log(e);
        return null;
    }
}

export const LikePost = async (session: Session, id: number): Promise<IPost | null> => {
    const config = GenerateConfig(session);
    try {
        const response = await axios.patch(`${API_URL}/api/posts/like`, null, {params: {id: id}, ... config});
        console.log(response);
        if(response.status === 200)
            return response.data;
        else 
            return null;
    } catch(e){
        console.log(e);
        return null;
    }
}

export const UnlikePost = async (session: Session, id: number): Promise<IPost | null> => {
    const config = GenerateConfig(session);
    try {
        const response = await axios.patch(`${API_URL}/api/posts/unlike`, null, {params: {id: id}, ... config});
        console.log(response);
        if(response.status === 200)
            return response.data;
        else 
            return null;
    } catch(e){
        console.log(e);
        return null;
    }
}

export const GetUserByHandle = async (session: Session, handle: string): Promise<IUser | null> => {
    const config = GenerateConfig(session);
    try {
        const response = await axios.get(`${API_URL}/api/users/findByHandle`, {params: {handle: handle}, ... config});
        console.log(response);
        if(response.status === 200)
            return response.data;
        else
            return null;
    } catch(e){
        console.log(e);
        return null;
    }
}

export const UserAction = async (session: Session, action: "follow" | "unfollow", id: number): Promise<IUser | null> => {
    const config = GenerateConfig(session)
    try {
        const response = await axios.patch(`${API_URL}/api/users/action`, {params: {action: action, id: id}, ... config});
        console.log(response);
        if(response.status === 200){
            return response.data;
        } else 
            return null;
    } catch(e){
        console.log(e);
        return null;
    }
}