import { Passenger } from "./passenger";
import { Reserve } from "./reserve";

export interface Ticket {
    idTicket: number;
    totalpayment: number;
    idReserve: Reserve;
    idPassenger: Passenger;
}
