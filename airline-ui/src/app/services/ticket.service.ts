import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Ticket } from '../interfaces/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(
    private http: HttpClient
  ) { }

  // Método que permite validar el descuento total a efectuar en un tiquete
  getValidateDiscounts(idPassenger: number) {
    const path = `http://localhost:8080/api/ticket/?idPassenger=${idPassenger}`;
    return this.http.get<number>(path);
  }

  // Método que permite crear o registrar nuevos tiquetes
  createTicket(ticket: Ticket) {
    const path = 'http://localhost:8080/api/ticket';
    return this.http.post(path, ticket);
  }

  // Método que permite buscar el id de la última reserva
  getLastReservation(idPassenger: number) {
    const path = `http://localhost:8080/api/ticket/lastReservation/${idPassenger}`;
    return this.http.get<number>(path);
  }

  // Método que permite buscar el id de la penúltima reserva
  getPenultimateReservation(idPassenger: number) {
    const path = `http://localhost:8080/api/ticket/penultimateReservation/${idPassenger}`;
    return this.http.get<number>(path);
  }
}
