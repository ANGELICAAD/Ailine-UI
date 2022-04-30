import { Component, OnInit } from '@angular/core';

import { ReserveService } from '../services/reserve.service';
import { InfoPasajerosComponent } from '../info-pasajeros/info-pasajeros.component';
import { ReserveOWDTO } from '../interfaces/reserveOWDTO';
import { ReserveRTDTO } from '../interfaces/reserveRTDTO';

@Component({
  selector: 'app-info-reservas',
  templateUrl: './info-reservas.component.html',
  styleUrls: ['./info-reservas.component.css']
})
export class InfoReservasComponent implements OnInit {

  public allReservations: any[] = []
  public showReservations: boolean = false
  public idReserve: number = 0
  public departureReturnFlight: boolean = false
  public allReservationsOW!: ReserveOWDTO[]
  public allReservationsRT!: ReserveRTDTO[]

  constructor(
    private reserveService: ReserveService,
    private infoPasajeros: InfoPasajerosComponent
  ) { }

  ngOnInit(): void {
    this.getInfo()
    this.showReservationList();
  }

  // Método para obtener la información enviada por el componente pasajeros
  getInfo() {
    this.infoPasajeros.ShowReservations.subscribe(result => {
      this.showReservations = result.data
    })

    this.infoPasajeros.IdReserve.subscribe(result => {
      this.idReserve = result.data
    })

    this.infoPasajeros.DepartureReturnFlight.subscribe(result => {
      this.departureReturnFlight = result.data
    })
  }

  // Método para mostrar la lista de reservadas creadas
  showReservationList() {
    if (this.departureReturnFlight == true) {
      this.getAllReservationsRT()
    } else {
      this.getAllReservationsOW()
    }
  }

  // Método para obtener las reservas que fueron creadas como tipo OW
  getAllReservationsOW() {
    this.reserveService.getAllReservationsOW(this.idReserve)
      .subscribe(reserve => {
        this.allReservationsOW = reserve;
      })
  }

  // Método para obtener las reservas que fueron creadas como tipo RT
  getAllReservationsRT() {
    this.reserveService.getAllReservationsRT(this.idReserve)
      .subscribe(reserve => {
        this.allReservationsRT = reserve;
      })
  }
}
