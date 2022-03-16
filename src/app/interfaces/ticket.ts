import { Passenger } from "./passenger";
import { Reserve } from "./reserve";

export interface Ticket {
    idTicket: number;
    totalPayment: number;
    idReserve: Reserve;
    idPassenger: Passenger;
}
