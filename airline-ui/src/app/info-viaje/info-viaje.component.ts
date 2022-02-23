import { Component, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { NgModel } from '@angular/forms';
import { EventEmitter } from '@angular/core';

import { RouteService } from '../services/route.service';
import { FlightService } from '../services/flight.service';

@Component({
  selector: 'app-info-viaje',
  templateUrl: './info-viaje.component.html',
  styleUrls: ['./info-viaje.component.css']
})
export class InfoViajeComponent implements OnInit {

  public allOriginCities: any[] = []
  public allDestinationCities: any[] = []
  public selectedOrigin: string = ""
  public selectedDestination: string = ""
  public adultNumber: number = 0
  public childNumber: number = 0
  public infantNumber: number = 0
  public passengerNumber: number = 0
  departureDate: Date = new Date()
  returnDate: Date = new Date()
  // public allFlights: any[] = []
  // @Output() Flights: EventEmitter<any> = new EventEmitter();
  public departureReturnFlight: boolean = false
  public departureFlight: boolean = false
  public allDepartureFlights: any[] = []
  @Output() DepartureFlights: EventEmitter<any> = new EventEmitter();
  public allReturnFlights: any[] = []
  @Output() ReturnFlights: EventEmitter<any> = new EventEmitter();

  constructor(
    public modal: NgbModal,
    private routeService: RouteService,
    private flightService: FlightService
  ) { }

  ngOnInit(): void {
    // Obtiene la lista de las ciudades origen
    this.routeService.getAllOriginCities()
      .subscribe(origin => {
        return this.allOriginCities = origin;
      })
  }

  // Obtiene el valor (ciudad de origen) seleccionada en el selected
  onSelectedOrigin(e: any) {
    this.selectedOrigin = e.target.value;
  }

  // Obtiene la lista de las ciudades destino de acuerdo a un origen
  getAllDestinations() {
    this.routeService.getAllDestinationCities(this.selectedOrigin)
      .subscribe(destinations => {
        return this.allDestinationCities = destinations;
      })
  }

  // Obtiene el valor (ciudad de destino) seleccionada en el selected
  onSelecteddestination(e: any) {
    this.selectedDestination = e.target.value;
  }

  // Permite que el modal se abra o se muestre en pantalla
  openNumberPassengers(passengers: any) {
    this.modal.open(passengers);
  }

  // Permite obtener o capturar los valores de la cantidad de pasajeros ingresados de acuerdo al tipo
  passengerSelection() {
    this.adultNumber = Number((document.getElementById("numAdult") as HTMLInputElement).value);
    this.childNumber = Number((document.getElementById("numChild") as HTMLInputElement).value);
    this.infantNumber = Number((document.getElementById("numInfant") as HTMLInputElement).value);
    this.passengerNumber = this.adultNumber + this.childNumber + this.infantNumber;
  }

  // Obtiene la lista de los vuelos disponibles
  // async getAllflight() {
  //   await this.flightService.getAllflight(this.selectedOrigin, this.selectedDestination, this.passengerNumber, this.departureDate)
  //     .subscribe(flights => {
  //       this.allFlights = flights;
  //       this.Flights.emit({data:this.allFlights})
  //     })
  // }

  // Capturar radio para tipo de fecha a mostrar
  selectedFlight() {
    this.departureReturnFlight = (document.getElementById("departureReturnFlight") as HTMLInputElement).checked;
    this.departureFlight = (document.getElementById("departureFlight") as HTMLInputElement).checked;
  }

  // Obtiene la lista de los vuelos disponibles de ida
  async getAllDepartureFlight() {
    await this.flightService.getAllflight(this.selectedOrigin, this.selectedDestination, this.passengerNumber, this.departureDate)
      .subscribe(flights => {
        this.allDepartureFlights = flights;
        this.DepartureFlights.emit({data:this.allDepartureFlights})
      })
  }

  // Obtiene la lista de los vuelos disponibles de regreso
  async getAllReturnFlight() {
    await this.flightService.getAllflight(this.selectedDestination, this.selectedOrigin, this.passengerNumber, this.returnDate)
      .subscribe(flights => {
        this.allReturnFlights = flights;
        this.ReturnFlights.emit({data:this.allReturnFlights})
      })
  }

  // Obtiene la lista de los vuelos dependiendo si se trata de un vuelo de ida y regreso o solo de ida
  getTypeAllFliths() {
    if(this.departureReturnFlight == true) {
      this.getAllDepartureFlight()
      this.getAllReturnFlight()
    } else {
      if(this.departureFlight == true) {
        this.getAllDepartureFlight();
      }
    }
  }
}
