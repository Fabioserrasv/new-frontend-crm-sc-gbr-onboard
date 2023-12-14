import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type CRMResponse = {
  siglasituacao: string;
  uf: string;
  nome: string;
  crm: number;
  dsUf: string;
}

@Injectable({
  providedIn: 'root'
})
export class CrmApiService {
  private apiUrl: string = 'https://api.crmsc.org.br/crvirtual-pessoafisica-services/servicos1/pf/';

  constructor(private httpClient: HttpClient) { }

  getCrmInfo(crm: number): Observable<CRMResponse> {
    try {
      if (String(crm).length != 4) {
        throw new Error("Invalid CRM")
      }

      return this.httpClient.get<CRMResponse>(this.apiUrl + crm);
    } catch (error) {
      console.log(error)
      throw error;
    }
  }
}
