import { Component, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { isEmpty } from '@ngneat/transloco';
import { EventEmitter } from '@angular/core';

import { InfoVuelosComponent } from '../info-vuelos/info-vuelos.component';
import { Passenger } from '../interfaces/passenger';
import { CityService } from '../services/city.service';
import { PassengerService } from '../services/passenger.service';
import { TicketService } from '../services/ticket.service';
import { FlightService } from '../services/flight.service';

@Component({
  selector: 'app-info-pasajeros',
  templateUrl: './info-pasajeros.component.html',
  styleUrls: ['./info-pasajeros.component.css']
})
export class InfoPasajerosComponent implements OnInit {

  public cityDestination: string = ""
  public expirationVisa: boolean = false
  public passengersList: any[] = []
  visaExpirationDate: Date = new Date()
  public allTypePassengers: string[] = ["Adulto", "Niño", "Infante"]
  public typePassenger: string = ""
  public passengerFound: Passenger | undefined;
  public newPassenger!: Passenger;
  public passenger!: Passenger;
  public messageMiles: string = ""
  public discountTotalTicket: number = 0
  public paymentDepartureTicket: number = 0
  public paymentReturnTicket: number = 0
  public selectedFlights: any[] = []
  public reserveList: any[] = []
  public departureReturnFlight: boolean = false
  public departureFlight: boolean = false
  public passengerExists: boolean = false;
  public reservationNumber: number = 0;
  public showReservations: boolean = false;
  @Output() ShowReservations: EventEmitter<any> = new EventEmitter();
  
  @ViewChild('infopassengers')
  public infopassengers!: TemplateRef<any>;
  @ViewChild('infosavepassengers')
  public infosavepassengers!: TemplateRef<any>;

  constructor(
    public modal: NgbModal,
    private infoVuelos: InfoVuelosComponent,
    private cityService: CityService,
    private passengerService: PassengerService,
    private ticketService: TicketService,
    private flightService: FlightService
  ) { }

  ngOnInit(): void {
    this.getInfo();
  }

  // Permite obtener la información enviada desde otros componenetes
  getInfo() {
    this.infoVuelos.CityDestination.subscribe(result => {
      this.cityDestination = result.data;
    })

    this.infoVuelos.DepartureReturnFlight.subscribe(result => {
      this.departureReturnFlight = result.data;
    })

    this.infoVuelos.DepartureFlight.subscribe(result => {
      this.departureFlight = result.data;
    })
  }

  // Método que permite conusltar si un destino requiere o no de fecha de expiración de visa
  getVisaRequired() {
    this.cityService.getVisaRequired(this.cityDestination)
      .subscribe(visa => {
        this.expirationVisa = visa     
      })
  }

  // Método para mostrar información de viaje (millas de pasajero), buscar y agregar a un pasajero
  activatedBtn() {    
    let documentP = (document.getElementById("document") as HTMLInputElement).value;
    // this.getFindPassengerByDocument("109748822")
    this.getFindPassengerByDocument(documentP)
    // console.log(this.passengerFound);
    setTimeout(() => {
      if(!isEmpty(this.passengerFound)) {
        this.passengerExists = true;
        console.log(this.passengerExists);
        // console.log("Pasajero encontrado");
        console.log(this.passengerFound?.idPassenger);
        this.getValidateFrequenceFlyer(Number(this.passengerFound?.idPassenger), 20);
        this.passengersList.push(this.passengerFound);
        console.log(this.passengersList);    
        this.calculateDiscount();
      } else {
        this.passengerExists = false;
      }
      if(this.passengerExists == true) {
        this.modal.open(this.infopassengers);
      } else{
        this.modal.open(this.infosavepassengers);
      }
    }, 2000);
  }

  // Método que permite consultar un pasajero por medio del documento
  async getFindPassengerByDocument(document: string) {
    await this.passengerService.getFindPassengerByDocument(document)
      .subscribe(infoPassenger => {
        this.passengerFound = infoPassenger;
        console.log(this.passengerFound);
      })
  }

  // Método para verificar si un pasajero es frecuente
  async getValidateFrequenceFlyer(idPassenger: number, miles: number) {
    await this.passengerService.getvalidateFrequentFlyer(3, miles)
      .subscribe(message => {
        let returnMessage = JSON.stringify(message)
        let sentence = returnMessage.split(":")[1]
        this.messageMiles = sentence.split("\"")[1]
        console.log(this.messageMiles);        
      })
  }

  // Obtiene el valor seleccionado en el tipo de pasajero
  selectedTypePassenger(e: any) {
    this.typePassenger = e.target.value;
  }

  // Método para crear un usuario en caso de no estar registrado en la base de datos
  savePassenger() {
    console.log(this.passengerExists);
    if(this.passengerExists == false) {
      let nameP = (document.getElementById("name") as HTMLInputElement).value;
      let lastNameP = (document.getElementById("lastName") as HTMLInputElement).value;
      let documentP = (document.getElementById("document") as HTMLInputElement).value;
      let ageP = Number((document.getElementById("age") as HTMLInputElement).value);
      let emailP = (document.getElementById("email") as HTMLInputElement).value;
      let phoneP = (document.getElementById("phone") as HTMLInputElement).value;
      
      this.newPassenger = {
        idPassenger: -1,
        document: documentP,
        name: nameP,
        lastName: lastNameP,
        phone: phoneP,
        email: emailP,
        age: ageP,
        type: this.typePassenger,
        visaExpirationDate: this.visaExpirationDate,
        numberTrips: 0,
        numberMiles: 0,
        frequentFlyer: false
      }
      console.log(this.newPassenger);     
      const jsonPassenger = JSON.stringify(this.newPassenger)
      this.passengerService.createPassenger(jsonPassenger).subscribe(res => {

      }, 
      error => console.log(error)
      )  
      
      this.getFindPassengerByDocument(this.newPassenger.document) 
      console.log(this.passengerFound);
      this.passengersList.push(this.passengerFound);
      console.log(this.passengersList);
      this.visaExpirationDate = new Date;
      this.typePassenger = ""  
      this.newPassenger = {
        idPassenger: -1,
        document: '',
        name: '',
        lastName: '',
        phone: '',
        email: '',
        age: 0,
        type: '',
        visaExpirationDate: new Date,
        numberTrips: 0,
        numberMiles: 0,
        frequentFlyer: false
      }
      this.calculateDiscount();
    }    
  }

  // Método para validar el descuento de cada pasajero
  calculateDiscount() {
    let discountResult = 0
    let discountDeparture = 0
    let discountReturn = 0
    let discountDepartureList: number[] = []
    let discountReturnList: number[] = []

    for (let i = 0; i < this.passengersList.length; i++) {
      console.log(this.passengersList[i][0]);      
      this.ticketService.getValidateDiscounts(this.passengersList[i].idPassenger)
        .subscribe(discount => {
          discountResult = discount
          discountDeparture = this.saveCalculateDiscount(this.paymentDepartureTicket, discountResult)
          discountDepartureList.push(discountDeparture)
          discountReturn = this.saveCalculateDiscount(this.paymentReturnTicket, discountResult)
          discountReturnList.push(discountReturn)
        })
      }
      console.log(discountDepartureList);          
      console.log(discountReturnList);
    this.calculateTotalPaymentDiscount(discountDepartureList, discountReturnList);
  }

  // Método para recuperar los datos sobre el costos de los tiquetes (ida y regreso)
  recorverPyments() {
    this.infoVuelos.PaymentDepartureTicket.subscribe(result => {
      this.paymentDepartureTicket = result.data
    })

    this.infoVuelos.PaymentReturnTicket.subscribe(result => {
      this.paymentReturnTicket = result.data
    })
  }

  // Método que permite guardar los descuentos por cada uno de los pasajeros
  saveCalculateDiscount(paymentTicket: number, discount: number) {
    let discountTotal = 0
    let discountResult = 0

    discountResult = paymentTicket * (discount / 100)
    discountTotal = paymentTicket - discountResult

    return discountTotal
  }

  // Método para calcular como tal el precio total a pagar
  calculateTotalPaymentDiscount(discountDepartureList: number[], discountReturnList: number[]) {
    let discountTotal = 0

    for (let i = 0; i < discountDepartureList.length; i++) {
      discountTotal += discountDepartureList[i]
      discountTotal += discountReturnList[i]
    }

    this.discountTotalTicket = discountTotal
    console.log(this.discountTotalTicket);    
  }

  // Método para guardar, crear o registrar una reserva
  saveReserve() {
    let reserve = {}
    let dtFlight
    let rtFlight

    this.flightService.getFlight(this.selectedFlights[0][4])
      .subscribe(flight => {
        dtFlight = flight
      })

    if(this.selectedFlights.length == 1 && this.departureFlight == true) {      
      reserve = {
        idReserve: -1,
        state: "pendiente",
        departureFlight: dtFlight,
        returnFlight: null,
        flightType: "OW"
      }
    } else {
      this.flightService.getFlight(this.selectedFlights[1][4])
      .subscribe(flight => {
        rtFlight = flight
      })

      reserve = {
        idReserve: -1,
        state: "pendiente",
        departureFlight: dtFlight,
        returnFlight: rtFlight,
        flightType: "RT"
      }
    }
    this.reserveList.push(reserve);
    console.log(this.reserveList);
    console.log(this.reserveList[0][0]);
  }

  // Método para guardar, registrar un tiquete
  saveTicket() {
    for(let i = 0; i < this.passengersList.length; i++) {
      if(this.selectedFlights.length == 1) {
        let ticket = {
          idTicket: -1,
          totalpayment: this.discountTotalTicket,
          idReserve: this.reserveList[0][0],
          idPassenger: this.passengersList[i][0]
        }
        this.ticketService.createTicket(ticket).subscribe;
      } else {
        let ticket = {
          idTicket: -1,
          totalpayment: this.discountTotalTicket,
          idReserve: this.reserveList[0][0],
          idPassenger: this.passengersList[i][0]
        }
        this.ticketService.createTicket(ticket).subscribe;
        ticket = {
          idTicket: -1,
          totalpayment: this.discountTotalTicket,
          idReserve: this.reserveList[1][0],
          idPassenger: this.passengersList[i][0]
        }
        this.ticketService.createTicket(ticket).subscribe;
      }
    }
    (document.getElementById("btnTotalPayment") as HTMLButtonElement).disabled
  }

  // Método para mostrar al pasajero el número de reserva y actualizar el estado de la reserva
  showReservationInfo() {
    this.showReservations = true
    this.ShowReservations.emit({data:this.showReservations})

    this.getFindPassengerByDocument(this.passengersList[0][1])
    let idPassenger = this.passengerFound?.idPassenger
    
    if(this.departureReturnFlight == true) {
      this.ticketService.getPenultimateReservation(Number(idPassenger))
        .subscribe(reserve => {
          this.reservationNumber = reserve;
        })
    } else {
      this.ticketService.getLastReservation(Number(idPassenger))
        .subscribe(reserve => {
          this.reservationNumber = reserve;
        })
    }
  }
}