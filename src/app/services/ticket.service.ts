import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Ticket } from '../interfaces/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private apiServerURL = environment.apiBaseURL

  constructor(
    private http: HttpClient
  ) { }

  // Método que permite validar el descuento total a efectuar en un tiquete
  getValidateDiscounts(idPassenger: number) {
    const path = `${this.apiServerURL}/api/ticket/?idPassenger=${idPassenger}`;
    return this.http.get<number>(path);
  }

  // Método que permite crear o registrar nuevos tiquetes
  createTicket(ticket: Ticket) {
    const path = `${this.apiServerURL}/api/ticket`;
    return this.http.post(path, ticket);
  }
}
