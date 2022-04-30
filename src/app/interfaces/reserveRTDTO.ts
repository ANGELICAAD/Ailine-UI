export interface ReserveRTDTO {
    state: string;
	nameCityOriginDeparture: string;
	nameCityDestinationDeparture: string;
	departureDate: Date;
	departureRouteType: string;
	nameCityOriginReturn: string;
	nameCityDestinationReturn: string;
	returnDate: Date;
	returnRouteType: string;
	passengerName: string;
	passengerLastName: string;
	documentName: string;
}