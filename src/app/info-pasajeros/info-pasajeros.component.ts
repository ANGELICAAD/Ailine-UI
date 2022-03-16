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
import { ReserveService } from '../services/reserve.service';
import { Flight } from '../interfaces/flight';
import { Reserve } from '../interfaces/reserve';

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
  public reserve!: Reserve
  public reserveList: Reserve[] = []
  public departureReturnFlight: boolean = false
  public departureFlight: boolean = false
  public passengerExists: boolean = false;
  public reservationNumber: number = 0;
  public showReservations: boolean = false;
  @Output() ShowReservations: EventEmitter<any> = new EventEmitter();
  public newReserve!: Reserve;
  public total: number = 0
  public idReserve: number = 0
  
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
    private flightService: FlightService,
    private reserveService: ReserveService
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

    this.infoVuelos.PaymentDepartureTicket.subscribe(result => {
      this.paymentDepartureTicket = result.data;
    })

    this.infoVuelos.PaymentReturnTicket.subscribe(result => {
      this.paymentReturnTicket = result.data;
    })

    this.infoVuelos.SelectedFlights.subscribe(result => {
      this.selectedFlights = result.data;
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
    this.getFindPassengerByDocument(documentP)
    setTimeout(() => {
      if(!isEmpty(this.passengerFound)) {
        this.passengerExists = true;
        this.getValidateFrequenceFlyer(Number(this.passengerFound?.idPassenger), 20);
        this.passengersList.push(this.passengerFound);
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
      })
  }

  // Método para verificar si un pasajero es frecuente
  async getValidateFrequenceFlyer(idPassenger: number, miles: number) {
    await this.passengerService.getvalidateFrequentFlyer(3, miles)
      .subscribe(message => {
        let returnMessage = JSON.stringify(message)
        let sentence = returnMessage.split(":")[1]
        this.messageMiles = sentence.split("\"")[1]
      })
  }

  // Obtiene el valor seleccionado en el tipo de pasajero
  selectedTypePassenger(e: any) {
    this.typePassenger = e.target.value;
  }

  // Método para crear un usuario en caso de no estar registrado en la base de datos
  savePassenger() {
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
      this.passengerService.createPassenger(this.newPassenger).subscribe(data => {
        this.getFindPassengerByDocument(this.newPassenger.document) 
        setTimeout(() => {
          this.passengersList.push(this.passengerFound);
          this.calculateDiscount();
          this.saveReserve(this.passengersList);
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
        }, 2000)
     });        
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
      this.ticketService.getValidateDiscounts(this.passengersList[i].idPassenger)
        .subscribe(discount => {
          discountResult = discount         
          discountDeparture = this.saveCalculateDiscount(this.paymentDepartureTicket, discountResult)
          discountDepartureList.push(discountDeparture)
          discountReturn = this.saveCalculateDiscount(this.paymentReturnTicket, discountResult)
          discountReturnList.push(discountReturn)
          this.calculateTotalPaymentDiscount(discountDepartureList, discountReturnList);
        })
      }
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
  }

  // Método para guardar, crear o registrar una reserva
  saveReserve(passengersList: any[]) {
    let dtFlight: Flight
    let rtFlight: Flight
    
    this.flightService.getFlight(this.selectedFlights[0][4])
    .subscribe(flight => {
      dtFlight = flight
        if(this.selectedFlights.length == 1 && this.departureFlight == true) {      
          this.newReserve = {
            idReserve: -1,
            state: "pendiente",
            departureFlight: dtFlight,
            flightType: "OW"
          }
          this.saveTicket(this.newReserve, passengersList)
        } else {
          this.flightService.getFlight(this.selectedFlights[1][4])
          .subscribe(flight => {
            rtFlight = flight
            console.log("rtflight",rtFlight);            
            this.newReserve = {
              idReserve: -1,
              state: "pendiente",
              departureFlight: dtFlight,
              returnFlight: rtFlight,
              flightType: "RT"
            }
            this.saveTicket(this.newReserve, passengersList)
          })    
        }
      })
  }

  // Método para guardar, registrar un tiquete
  saveTicket(newReserve:Reserve, passengersList: any[]) {
    this.reserveService.createReserve(newReserve).subscribe(data => {
      this.idReserve = data.idReserve; 
      let total = Number((document.getElementById("total-pagar") as HTMLInputElement).value.substring(2))
      for(let i = 0; i < passengersList.length; i++) {
        if(this.selectedFlights.length == 1) {
          const valor = this.discountTotalTicket       
          let ticket = {
            idTicket: -1,
            totalPayment: total,
            idReserve: data,
            idPassenger: passengersList[i]
          }
          this.ticketService.createTicket(ticket).subscribe(result => {
            console.log("ticket",result);     
          });
        } else {
          let ticket1 = {
            idTicket: -1,
            totalPayment: total,
            idReserve: data,
            idPassenger: passengersList[i]
          }
          this.ticketService.createTicket(ticket1).subscribe(result => {
            console.log("ticket",result);
          });
          ticket1 = {
            idTicket: -1,
            totalPayment: total,
            idReserve: data,
            idPassenger: passengersList[i]
          }
          this.ticketService.createTicket(ticket1).subscribe(result => {
            console.log("ticket",result);  
          });
        }
      }
    })
  }

  // Método para mostrar al pasajero el número de reserva y actualizar el estado de la reserva
  showReservationInfo() {
    this.changeReservationStatus(this.newReserve);

    this.showReservations = true
    this.ShowReservations.emit({data:this.showReservations})
    
    this.getFindPassengerByDocument(this.passengersList[0].document)
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

  // Método para modificar el estado actual de la reserva, es decir, de estado pendiente a confirmado
  changeReservationStatus(reserve: Reserve) {
    let createdReserve = {
      idReserve: this.idReserve,
      state: "confirmado",
      departureFlight: reserve.departureFlight,
      returnFlight: reserve.returnFlight,
      flightType: reserve.flightType
    }
    this.reserveService.reservationUpgrade(createdReserve).subscribe(result => {
      console.log(result);              
    })  
  }
}