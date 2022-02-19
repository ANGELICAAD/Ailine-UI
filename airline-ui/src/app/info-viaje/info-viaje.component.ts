import { Component, OnInit } from '@angular/core';

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

  constructor(
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
}
