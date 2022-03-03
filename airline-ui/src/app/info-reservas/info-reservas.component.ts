import { Component, OnInit } from '@angular/core';

import { ReserveService } from '../services/reserve.service';
import { Reserve } from '../interfaces/reserve';
import { InfoPasajerosComponent } from '../info-pasajeros/info-pasajeros.component';

@Component({
  selector: 'app-info-reservas',
  templateUrl: './info-reservas.component.html',
  styleUrls: ['./info-reservas.component.css']
})
export class InfoReservasComponent implements OnInit {

  public allReservations: any[] = []
  public showReservations: boolean = false

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
  }

  // Método para mostrar la lista de reservadas creadas
  showReservationList() {
    this.reserveService.getAllReservations()
      .subscribe(reserve => {
        this.allReservations = reserve;
      })
  }
}
