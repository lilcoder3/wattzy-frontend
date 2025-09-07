import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import Swal from 'sweetalert2';
import {LoginService} from '../../service/login-service';
import {JwtRequest} from '../../model/JwtRequest';
import {JwtHelperService} from '@auth0/angular-jwt';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login-component',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css'
})
export class LoginComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private router: Router,
    public route: ActivatedRoute
  ) {}

  username: string = '';
  password: string = '';
  mensaje: string = '';
  id: number=0;

  ngOnInit(): void {}

  login() {
    let request = new JwtRequest();
    request.username = this.username;
    request.password = this.password;

    this.loginService.login(request).subscribe(
      (data: any) => {
        let token = data.jwttoken;
        sessionStorage.setItem('token', data.jwttoken);
        sessionStorage.setItem('username', this.username);

        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(token);

        const userId = decodedToken.id;
        if (userId) {
          sessionStorage.setItem('userId', userId.toString());
          console.log('ID del usuario obtenido del token:', userId);
        } else {
          console.warn('No se encontró el ID en el token');
        }
        // Alerta de éxito con SweetAlert2
        Swal.fire({
          icon: 'success',
          title: 'Login exitoso',
          text: 'Bienvenido al sistema',
          confirmButtonColor: '#000000', // Puedes usar tus colores personalizados
        }).then(() => {
          this.router.navigate(['home']);
        });
      },
      (error) => {
        this.mensaje = 'Credenciales incorrectas';

        // Alerta de error con SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'Error de autenticación',
          text: this.mensaje,
          confirmButtonColor: '#000000', // Puedes usar tus colores personalizados
        });
      }
    );
  }
}
