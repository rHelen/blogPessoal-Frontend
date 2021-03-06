import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  entrar(usuarioLogin: UsuarioLogin): Observable<UsuarioLogin> {
    return this.http.post<UsuarioLogin>(
      'https://personalbspring.herokuapp.com/usuario/logar',usuarioLogin );
  }
  cadastrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(
      'https://personalbspring.herokuapp.com/usuario/cadastrar',usuario);
  }

  atualizar(usuario: Usuario): Observable<Usuario>{
    return this.http.put<Usuario>('https://personalbspring.herokuapp.com/usuario/atualizar', usuario, this.token)
  }

  getByIdUser(id:number): Observable<Usuario>{
    return this.http.get<Usuario>(`https://personalbspring.herokuapp.com/usuario/${id}`, this.token)
  }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }
  
  refreshToken() {
    this.token = {
      headers: new HttpHeaders().set('Authorization', environment.token)
    }
  }

  logado(){
    let ok = false

    if(environment.token != ''){
      ok = true
    }

    return ok
  }
}
