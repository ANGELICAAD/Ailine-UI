import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Reserve } from '../interfaces/reserve';

@Injectable({
  providedIn: 'root'
})
export class ReserveService {

  constructor(
    private http: HttpClient
  ) { }

  // Método que permite crear o registrar nuevas reservas
  createReserve(reserve: Reserve) {
    const path = 'http://localhost:8080/api/reserve';
    return this.http.post<Reserve>(path, reserve);
  }

  // Método que permite listar las reservas creadas
  getAllReservations() {
    const path = 'http://localhost:8080/api/reserve/';
    return this.http.get<Reserve[]>(path);
  }

  // Método que permite actualizar el estado de una reserva
  reservationUpgrade(reserve: Reserve) {
    const path = `http://localhost:8080/api/reserve/update/${reserve.idReserve}`;
    return this.http.put<Reserve>(path, reserve);
  }
}
