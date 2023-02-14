import { Injectable } from '@nestjs/common';
import axios, { CreateAxiosDefaults, AxiosInstance } from 'axios';

export interface Identity {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  maiden_name: string;
  birth_data: string;
  phone_h: string;
  phone_w: string;
  email_u: string;
  email_d: string;
  username: string;
  password: string;
  domain: string;
  useragent: string;
  ipv4: string;
  macaddress: string;
  plasticcard: string;
  cardexpir: string;
  bonus: number;
  company: string;
  color: string;
  uuid: string;
  height: number;
  weight: number;
  blood: string;
  eye: string;
  hair: string;
  pict: string;
  url: string;
  sport: string;
  ipv4_url: string;
  email_url: string;
  domain_url: string;
}

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

    async fetch_identity(region: string, gender: "male" | "female"): Promise<Identity>{
        const response = await this.instance.get(`${region}/${gender}`);
        return response.data;
    }
}
