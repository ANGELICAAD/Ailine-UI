import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

import { InfoViajeComponent } from '../info-viaje/info-viaje.component';

@Component({
  selector: 'app-info-vuelos',
  templateUrl: './info-vuelos.component.html',
  styleUrls: ['./info-vuelos.component.css']
})
export class InfoVuelosComponent implements OnInit {

  public allDepartureFlights: any[] = []
  public allReturnFlights: any[] = []
  public selectedFlights: any[] = []
  @Output() SelectedFlights: EventEmitter<any> = new EventEmitter();
  public paymentTotal: number = 0
  public paymentDepartureTicket: number = 0
  @Output() PaymentDepartureTicket: EventEmitter<any> = new EventEmitter();
  public paymentReturnTicket: number = 0
  @Output() PaymentReturnTicket: EventEmitter<any> = new EventEmitter();
  public cityDestination: string = ""
  @Output() CityDestination: EventEmitter<any> = new EventEmitter();
  public departureReturnFlight: boolean = false
  @Output() DepartureReturnFlight: EventEmitter<any> = new EventEmitter();
  public departureFlight: boolean = false
  @Output() DepartureFlight: EventEmitter<any> = new EventEmitter();
  
  constructor(
    private infoViaje: InfoViajeComponent
  ) { }

  ngOnInit(): void {
    
    this.getLists();
  }

  // Obtiene los datos de las listas del componente info-viaje
  getLists() {
    // Lista de vuelos de ida
    this.infoViaje.DepartureFlights.subscribe(result => {
      this.allDepartureFlights = result.data;  
    })

    // Lista de vuelos de regreso
    this.infoViaje.ReturnFlights.subscribe(result => {
      this.allReturnFlights = result.data;
    })

    this.infoViaje.CityDestination.subscribe(result => {
      this.cityDestination = result.data;     
      this.CityDestination.emit({data:this.cityDestination})
    })

    this.infoViaje.DepartureReturnFlight.subscribe(result => {
      this.departureReturnFlight = result.data;
    })

    this.infoViaje.DepartureFlight.subscribe(result => {
      this.departureFlight = result.data;
      this.DepartureFlight.emit({data:this.departureFlight})
    })
  }

  // Permite seleccionar un vuelo de ida
  selectedRowDeparture(flight: any) { 
    this.paymentDepartureTicket = flight[3];
    this.PaymentDepartureTicket.emit({data:this.paymentDepartureTicket})
    this.selectedFlights.push(flight);
    this.calculateTotal(flight);
    this.SelectedFlights.emit({data:this.selectedFlights})
  }

  // Permite seleccionar un vuelo de regreso
  selectedRowReturn(flight: any) {
    this.paymentReturnTicket = flight[3];
    this.PaymentReturnTicket.emit({data:this.paymentReturnTicket})
    this.selectedFlights.push(flight);
    this.calculateTotal(flight);
    this.SelectedFlights.emit({data:this.selectedFlights})
  }

  // Método que permite calcular el total de pago del vuelo
  calculateTotal(flight: any) {
    this.paymentTotal = this.paymentTotal + flight[3];
  }
}
