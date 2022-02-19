import { Route } from "./route";

export interface Flight {
    idFlight: number;
    number: string;
    type: string;
    date: Date;
    hour: string;
    duration: string;
    routeType: string;
    chairsAvailable: number;
    cost: number;
    idRoute: Route;
}
