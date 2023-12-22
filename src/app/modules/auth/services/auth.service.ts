import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { RegisterForm } from '../components/register-modal/register-modal.component';
import { lastValueFrom } from 'rxjs';
import { LoginForm } from '../pages/login/login.component';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { User } from '../../../core/entities/User';
import { API_URL } from '../../../config/env';

type ServerRegisterForm = {
  nome: string;
  cpf: string;
  crm: string;
  email: string;
  senha: string;
  dataNascimento: string;
}

type ServerLoginForm = {
  email: string;
  password: string;
}

type RegisterResponse = {
  message: string;
}

type ServerLoginResponse = {
  id: string;
  nome: string;
  cpf: string;
  crm: string;
  email: string;
  senha: string;
  dataNascimento: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private httpClient: HttpClient, @Inject(PLATFORM_ID) private platformId: any) { }

  convertRegisterFormToServerRegisterForm(data: RegisterForm): ServerRegisterForm {
    return {
      nome: data.nome || '',
      cpf: data.cpf || '',
      crm: data.crm || '',
      email: data.email || '',
      senha: data.senha || '',
      dataNascimento: data.nascimento || '',
    }
  }

  convertLoginFormToServerLoginForm(data: LoginForm): ServerLoginForm {
    return {
      email: data.email,
      password: data.senha
    }
  }

  async register(data: RegisterForm): Promise<boolean> {
    const dataUser = this.convertRegisterFormToServerRegisterForm(data);
    try {
      const response: any = await lastValueFrom(this.httpClient.post<any>(API_URL + '/user', dataUser));

      console.log(response);

      if (response > 0) {
        return true;
      }

      return false;
    } catch (error) {
      throw error;
    }
  }

  async login(dataLogin: LoginForm): Promise<boolean> {
    try {
      let serverDataLogin = this.convertLoginFormToServerLoginForm(dataLogin);

      const httpOptions = {
        headers: new HttpHeaders({

        }),
      };

      const response = await lastValueFrom(
        this.httpClient.post<ServerLoginResponse>(API_URL + '/auth/login', serverDataLogin, { observe: "response" })
      );

      let user: ServerLoginResponse = response.body!;
      let token = response.headers.get('x-token');

      if (user && token && user.id != "0") {
        localStorage.setItem("jwtToken", token)
        return true;
      }

      return false;
    } catch (error) {
      throw error;
    }
  }
}
