import { City } from "./city";

export interface Route {
    idRoute: number;
    acumulateMiles: number;
    originCity: City;
    destinationCity: City;
}
