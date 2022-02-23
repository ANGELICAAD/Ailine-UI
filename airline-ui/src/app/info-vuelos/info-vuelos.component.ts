import { Component, OnInit } from '@angular/core';

import { InfoViajeComponent } from '../info-viaje/info-viaje.component';

@Component({
  selector: 'app-info-vuelos',
  templateUrl: './info-vuelos.component.html',
  styleUrls: ['./info-vuelos.component.css']
})
export class InfoVuelosComponent implements OnInit {

  // public allFlights: any[] = []
  public allDepartureFlights: any[] = []
  public allReturnFlights: any[] = []
  public selectedFlights: any[] = []
  public paymentTotal: number = 0
  public paymentDepartureTicket: number = 0
  public paymentReturnTicket: number = 0
  
  constructor(
    private infoViaje: InfoViajeComponent
  ) { }

  ngOnInit(): void {
    // this.infoViaje.Flights.subscribe(result => {
    //   this.allFlights = result.data;
    //   console.log(this.allFlights);       
    // })
    
    this.getLists();
  }

  // Obtiene los datos de las listas del componente info-viaje
  getLists() {
    // Lista de vuelos de ida
    this.infoViaje.DepartureFlights.subscribe(result => {
      this.allDepartureFlights = result.data;
      // console.log(this.allDepartureFlights);    
    })

    // Lista de vuelos de regreso
    this.infoViaje.ReturnFlights.subscribe(result => {
      this.allReturnFlights = result.data;
      // console.log(this.allReturnFlights); 
    })
  }

  // Permite seleccionar un vuelo de ida
  selectedRowDeparture(flight: any) { 
    this.paymentDepartureTicket = flight[3];
    this.selectedFlights.push(flight);
    // console.log(flight[0]);   
    // console.log(this.selectedFlights);
    // console.log(this.selectedFlights[0]);
    this.calculateTotal(flight);
  }

  // Permite seleccionar un vuelo de regreso
  selectedRowReturn(flight: any) {
    this.paymentReturnTicket = flight[3];
    this.selectedFlights.push(flight);
    // console.log(flight[0]);   
    // console.log(this.selectedFlights);
    // console.log(this.selectedFlights[0]);
    this.calculateTotal(flight);
  }

  // Método que permite calcular el total de pago del vuelo
  calculateTotal(flight: any) {
    this.paymentTotal = this.paymentTotal + flight[3];
  }
}
