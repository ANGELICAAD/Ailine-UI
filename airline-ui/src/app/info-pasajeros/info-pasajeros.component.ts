import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgModel } from '@angular/forms';
import { isEmpty } from '@ngneat/transloco';

import { InfoVuelosComponent } from '../info-vuelos/info-vuelos.component';
import { Passenger } from '../interfaces/passenger';
import { CityService } from '../services/city.service';
import { PassengerService } from '../services/passenger.service';

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
  public passenger: Passenger | undefined;

  constructor(
    public modal: NgbModal,
    private infoVuelos: InfoVuelosComponent,
    private cityService: CityService,
    private passengerService: PassengerService
  ) { }

  ngOnInit(): void {
    this.getInfo();
  }

  // Permite obtener la información enviada desde otros componenetes
  getInfo() {
    this.infoVuelos.CityDestination.subscribe(result => {
      this.cityDestination = result.data;
      // console.log(this.cityDestination);
    })
  }

  // Permite que el modal se abra o se muestre en pantalla
  openInfoPassengers(infopassengers: any) {
    this.modal.open(infopassengers);
  }

  // Método que permite conusltar si un destino requiere o no de fecha de expiración de visa
  getVisaRequired() {
    this.cityService.getVisaRequired(this.cityDestination)
      .subscribe(visa => {
        this.expirationVisa = visa
        // console.log(this.expirationVisa);        
      })
  }

  // Obtiene el valor seleccionado en el tipo de pasajero
  selectedTypePassenger(e: any) {
    this.typePassenger = e.target.value;
    // console.log(this.typePassenger);
  }
  
  // Método que permite guardar la información de los pasajeros ingresados en la página
  savePassengerList() {    
    let idPassenger = -1
    let nameP = (document.getElementById("name") as HTMLInputElement).value;
    let lastNameP = (document.getElementById("lastName") as HTMLInputElement).value;
    let documentP = (document.getElementById("document") as HTMLInputElement).value;
    let ageP = Number((document.getElementById("age") as HTMLInputElement).value);
    let emailP = (document.getElementById("email") as HTMLInputElement).value;
    let phoneP = (document.getElementById("phone") as HTMLInputElement).value;
    let info = ""
    this.getVisaRequired()
    console.log(this.getVisaRequired());    
    if(this.expirationVisa === true) {
      info = idPassenger + "," + documentP + "," + nameP + "," + lastNameP + "," + phoneP + "," + emailP + "," + ageP + "," + this.typePassenger + "," + this.visaExpirationDate;
    } else{      
      info = idPassenger + "," + documentP + "," + nameP + "," + lastNameP + "," + phoneP + "," + emailP + "," + ageP + "," + this.typePassenger;
    }
    this.visaExpirationDate = new Date;
    this.typePassenger = ""    
    this.passengersList.push(info);
    // console.log(this.passengersList[0]);
    for (let i = 0; i < this.passengersList.length; i++) {
      console.log(this.passengersList[i]);
    }
  }

  // Método que permite consultar un pasajero por medio del documento
  async getFindPassengerByDocument(document: string) {
    await this.passengerService.getFindPassengerByDocument(document)
      .subscribe(infoPassenger => {
        this.passenger = infoPassenger;
        console.log(this.passenger);
      })
  }

  // Método para crear un usuario en caso de no estar registrado en la base de datos
  savePassenger() {
    let nameP = (document.getElementById("name") as HTMLInputElement).value;
    let lastNameP = (document.getElementById("lastName") as HTMLInputElement).value;
    let documentP = (document.getElementById("document") as HTMLInputElement).value;
    let ageP = Number((document.getElementById("age") as HTMLInputElement).value);
    let emailP = (document.getElementById("email") as HTMLInputElement).value;
    let phoneP = (document.getElementById("phone") as HTMLInputElement).value;
    let typeP = ""

    this.getFindPassengerByDocument(documentP)
    console.log(this.passenger);
    setTimeout(() => {
      // if(!isEmpty(this.passenger)) {
      //   console.log("no está vacío");
      // }
      if (isEmpty(this.passenger)) {
        const passengerP = {
          idpassenger: -1,
          document: documentP,
          name: nameP,
          lastName: lastNameP,
          phone: phoneP,
          email: emailP,
          age: ageP,
          type: typeP,
          visaExpirationDate: this.visaExpirationDate,
          numberTrips: 0,
          numberMiles: 0,
          frequentFlyer: false
        }
        this.passengerService.createPassenger(passengerP).subscribe;
      }
    }, 3000);
  }
}
