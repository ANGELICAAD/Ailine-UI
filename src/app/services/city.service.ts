import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { City } from '../interfaces/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private apiServerURL = environment.apiBaseURL

  constructor(
    private http: HttpClient
  ) { }

  // Método que permite validar si una ciudad destino requiere de visa
  getVisaRequired(name: string) {
    // const path = `http://localhost:8080/api/city/${name}`;
    const path = `${this.apiServerURL}/api/city/${name}`;
    return this.http.get<boolean>(path);
  }
}
