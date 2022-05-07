import { Component, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';

import { RouteService } from '../services/route.service';
import { FlightService } from '../services/flight.service';
import { FlightList } from '../interfaces/flightList';
import { FlightDTO } from '../interfaces/flightDTO';

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
  public departureReturnFlight: boolean = false
  @Output() DepartureReturnFlight: EventEmitter<any> = new EventEmitter();
  public departureFlight: boolean = false
  @Output() DepartureFlight: EventEmitter<any> = new EventEmitter();
  public allDepartureFlights: any[] = []
  @Output() DepartureFlights: EventEmitter<any> = new EventEmitter();
  public allReturnFlights: any[] = []
  @Output() ReturnFlights: EventEmitter<any> = new EventEmitter();
  @Output() CityDestination: EventEmitter<any> = new EventEmitter();
  public dateDeparture!: string;
  public dateReturn: Date = new Date();
  public newFlightList!: FlightList;
  public newFlightDTO!: FlightDTO;

  numberPassenger!: FormGroup

  constructor(
    public modal: NgbModal,
    private routeService: RouteService,
    private flightService: FlightService
  ) {
    this.numberPassenger = new FormGroup({
      formAdult: new FormControl('', [
        Validators.required,
        Validators.pattern(/^((\\+91-?)|0)?[0-9]{1,2}$/)
      ]),
      formChild: new FormControl('', [
        Validators.required,
        Validators.pattern(/^((\\+91-?)|0)?[0-9]{1,2}$/)
      ]),
      formInfant: new FormControl('', [
        Validators.required,
        Validators.pattern(/^((\\+91-?)|0)?[0-9]{1,2}$/)
      ])
    })
  }

  ngOnInit(): void {
    this.dateDeparture = new Date().toJSON().substring(0,10)

    // Obtiene la lista de las ciudades origen
    this.routeService.getAllOriginCities()
      .subscribe(origin => {
        return this.allOriginCities = origin;
      })
  }

  // Permite la selección de fechas de regreso mayores a la seleccionada en fecha de ida
  selecDateReturn() {
    this.dateReturn = this.departureDate
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
    this.CityDestination.emit({ data: this.selectedDestination })
  }

  // Permite que el modal se abra o se muestre en pantalla
  openNumberPassengers(passengers: any) {
    this.modal.open(passengers);
  }

  // Permite obtener o capturar los valores de la cantidad de pasajeros ingresados de acuerdo al tipo
  // passengerSelection(adultNumber: string, childNumber: string, infantNumber: string) {
  //   this.adultNumber = Number(adultNumber);
  //   this.childNumber = Number(childNumber);
  //   this.infantNumber = Number(infantNumber);
  //   this.passengerNumber = this.adultNumber + this.childNumber + this.infantNumber;
  // }

  // Capturar radio para tipo de fecha a mostrar
  selectedFlight() {
    this.departureReturnFlight = (document.getElementById("departureReturnFlight") as HTMLInputElement).checked;
    this.departureFlight = (document.getElementById("departureFlight") as HTMLInputElement).checked;

    this.DepartureFlight.emit({ data: this.departureFlight })
  }

  // Obtiene la lista de los vuelos disponibles de ida
  async getAllDepartureFlight() {
    await this.flightService.getAllflight(this.selectedOrigin, this.selectedDestination, this.passengerNumber, this.departureDate)
      .subscribe(flights => {
        this.allDepartureFlights = flights;
        this.DepartureFlights.emit({ data: this.allDepartureFlights })
      })
  }

  // Obtiene la lista de los vuelos disponibles de regreso
  async getAllReturnFlight() {
    await this.flightService.getAllflight(this.selectedDestination, this.selectedOrigin, this.passengerNumber, this.returnDate)
      .subscribe(flights => {
        this.allReturnFlights = flights;
        this.ReturnFlights.emit({ data: this.allReturnFlights })
      })
  }

  // Obtiene la lista de los vuelos dependiendo si se trata de un vuelo de ida y regreso o solo de ida
  getTypeAllFliths() {
    if (this.departureReturnFlight == true) {
      this.getAllDepartureFlight()
      this.getAllReturnFlight()
    } else {
      if (this.departureFlight == true) {
        this.getAllDepartureFlight();
      }
    }
    this.DepartureReturnFlight.emit({ data: this.departureReturnFlight })
  }

  // Permite la captura de los datos ingresados en el modal de la cantidad de pasajeros
  onSubmitNumberPassengers() {
    this.passengerNumber = Number(this.numberPassenger.value.formAdult) + Number(this.numberPassenger.value.formChild) + Number(this.numberPassenger.value.formInfant);
  }

  // Método para validar la información del ingreso de la cantidad de pasajeros
  // validatePassengerFields() {
  //   let adultNumber = (document.getElementById("numAdult") as HTMLInputElement).value;
  //   let childNumber = (document.getElementById("numChild") as HTMLInputElement).value;
  //   let infantNumber = (document.getElementById("numInfant") as HTMLInputElement).value;

  //   if (Number(adultNumber) && Number(childNumber) && Number(infantNumber)) {
  //     this.passengerSelection(adultNumber, childNumber, infantNumber)
  //   }
  // }
}
