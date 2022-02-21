import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { RouteService } from '../services/route.service';

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
  public departureDate: Date = new Date()
  public returnDate: Date = new Date()

  constructor(
    public modal: NgbModal,
    private routeService: RouteService
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
  onSelecteddestination(e:any) {
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
  }
  
  // Permite capturar los valores de las fechas ingresadas por el usuario
  dateSelection() {
    this.departureDate = new Date((document.getElementById("departureDate") as HTMLInputElement).value + '');
    this.returnDate = new Date((document.getElementById("returnDate") as HTMLInputElement).value + '');
    console.log(this.departureDate);
    console.log(this.returnDate);    
  }
}
