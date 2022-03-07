import { Flight } from "./flight";

export interface Reserve {
    idReserve: number;
    state: string;
    departureFlight: Flight;
    returnFlight: Flight;
    flightType: string;
}
