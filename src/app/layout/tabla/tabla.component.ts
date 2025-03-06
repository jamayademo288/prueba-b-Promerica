import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import { concatMap, debounceTime, switchMap } from 'rxjs/operators';
import { Usuario } from 'src/app/model/usuario';
import { PaisService } from 'src/app/service/pais.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit { //Se implemente el ciclo de vida de onInit para la inicializacion del component
  public formFiltro: FormGroup = new FormGroup({
    filtro: new FormControl('')
  });
  public usuarios: Usuario[] = [];
  public usuariosMostrados: Usuario[] = [];

  constructor(
    private readonly userService: UsuarioService,
    private readonly paisService: PaisService,
  ){

  }

  ngOnInit(): void {
    this.getListaUsuarios(); //se realiza el llamado del metodo getListaUsuarios al momento de la inicializacion del componente
    this.buscarUsuarios();
    this.getListaUsuariosPrueba('CA');
    this.getAvatartest('jose','perez')
  }

  getListaUsuariosTest() {
  // Obtenemos los usuarios
  this.userService.getUsuarios().subscribe({
      next: (resp) => {
        console.log('Usuarios:', resp);
        this.usuarios = resp;
        const usuariosConNacionalidad: Usuario[] = [];

        // Recorremos cada usuario uno por uno de forma secuencial
        of(...this.usuarios).pipe(
          concatMap((usuario) => {
            // Llamamos al servicio para obtener la nacionalidad de cada usuario
            return this.getPaisByCodeTest(usuario.country).pipe(
              concatMap(paisResp => {
                const nacionalidad = paisResp[1]?.name || 'Desconocida';
                const usuarioConPais = { ...usuario, nationality: nacionalidad }; //se crea un nuevo objeto con el spread en usuarios y se le agrega el valor en el parametro que es obcional
                usuariosConNacionalidad.push(usuarioConPais); //se guardan con el push en el objeto usuariosConNacionalidad
                return [];
              })
            );
          })
        ).subscribe({
          next: () => {
            console.log('exito');
          },
          complete: () => {
            //se usa complete para realizar operaciones una vez se finalizan
            //una vez se completa todo lo anterior se alojara en objeto con la nacionalidad dentro del objeto a recorrer en el html
            //el cual es this.usuarios
            this.usuarios = usuariosConNacionalidad;
            console.log(this.usuarios);
          },
          error: (error) => {
            console.error('Error al obtener nacionalidad:', error);
          }
        });
      },
      error: (err) => {
        console.error('Error al obtener usuarios:', err);
      }
    });
  }

  getListaUsuariosPrueba(code:string) {
    this.paisService.getPaisByCode(code).subscribe({
      next: (resp) => {
        console.log(resp)

      }
    })
  }

  getAvatartest(name:string, lastname:string) {
    // Llamamos al servicio que devuelve la información del país
    return this.userService.getAvatar(name, lastname).subscribe({
      next: (resp) => {
        console.log(resp)

      }
    });
  }

  getPaisByCodeTest(code: string) {
    // Llamamos al servicio que devuelve la información del país
    return this.paisService.getPaisByCode(code);//retorna el observable para ser usado donde se necesita
  }

  getListaUsuarios() {
    this.userService.getUsuarios().subscribe({
      next: (resp) => {
        console.log(resp)
        this.usuarios = resp;
        this.usuariosMostrados = this.usuarios.slice(0, 25); //Se muestras unicamente 25 registros
      }
    })
  }

  getAvatar(name:string, lastname:string){
     // Llamamos al servicio que devuelve la información del país
    return this.userService.getAvatar(name, lastname); //retorna el observable para ser usado donde se necesita
  }

  buscarUsuarios() {
    this.formFiltro.get('filtro')!.valueChanges.pipe(
      debounceTime(500), //permite que se realiza la busqueda una vez de deja de escribir
      switchMap(valor => this.getUsuariosBySearch(valor))
    ).subscribe(usuarios => {
      this.usuarios = usuarios;
    });
  }

  getUsuariosBySearch(value: string) {
    return this.userService.getUsuariosBySearch(value);
  }

}
