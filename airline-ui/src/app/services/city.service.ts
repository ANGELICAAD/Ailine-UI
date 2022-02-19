import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { City } from '../interfaces/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(
    private http: HttpClient
  ) { }

  // Método que permite validar si una ciudad destino requiere de visa
  getVisaRequired(name: string) {
    const path = `http://localhost:8080/api/city/${name}`;
    return this.http.get<boolean>(path);
  }
}
