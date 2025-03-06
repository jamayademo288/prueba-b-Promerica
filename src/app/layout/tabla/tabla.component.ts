import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit { //Se implemente el ciclo de vida de onInit para la inicializacion del component

  constructor(
    private user: UsuarioService,
  ){

  }

  ngOnInit(): void {
    this.getListaUsuarios();
  }

  getListaUsuarios(){
    this.user.getUsuarios().subscribe( resp => {
      console.log(resp);
    });
  }

}
