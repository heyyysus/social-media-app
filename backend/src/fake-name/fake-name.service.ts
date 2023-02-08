import { Injectable } from '@nestjs/common';
import axios, { CreateAxiosDefaults, AxiosInstance } from 'axios';

@Injectable()
export class FakeNameService {
    private static API_URL = "https://api.namefake.com/";
    private instance: AxiosInstance;

    constructor(){
        const config: CreateAxiosDefaults = {
            baseURL: FakeNameService.API_URL
        };
        this.instance = axios.create(config);
    }

    async fetch_identity(region: string, gender: "male" | "female"){
        const response = await this.instance.get(`${region}/${gender}`);
        return response.data;
    }
}
