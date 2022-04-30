import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Reserve } from '../interfaces/reserve';
import { ReserveOWDTO } from '../interfaces/reserveOWDTO';
import { ReserveRTDTO } from '../interfaces/reserveRTDTO';

@Injectable({
  providedIn: 'root'
})
export class ReserveService {

  private apiServerURL = environment.apiBaseURL

  constructor(
    private http: HttpClient
  ) { }

  // Método que permite crear o registrar nuevas reservas
  createReserve(reserve: Reserve) {
    const path = `${this.apiServerURL}api/reserve`;
    return this.http.post<Reserve>(path, reserve);
  }

  // Método que permite listar las reservas creadas
  getAllReservations() {
    const path = `${this.apiServerURL}api/reserve/`;
    return this.http.get<Reserve[]>(path);
  }

  // Método que permite actualizar el estado de una reserva
  reservationUpgrade(reserve: Reserve) {
    const path = `${this.apiServerURL}api/reserve/update/${reserve.idReserve}`;
    return this.http.put<Reserve>(path, reserve);
  }

  // Método que permite obtener la lista de las reservas con el tipo de vuelo OW
  getAllReservationsOW(idReserve: number) {
    const path = `${this.apiServerURL}api/reserve/reservationOW/${idReserve}`;
    return this.http.get<ReserveOWDTO[]>(path);
  }

  // Método que permite obtener la lista de las reservas con el tipo de vuelo RT
  getAllReservationsRT(idReserve: number) {
    const path = `${this.apiServerURL}api/reserve/reservationRT/${idReserve}`;
    return this.http.get<ReserveRTDTO[]>(path);
  }
}
