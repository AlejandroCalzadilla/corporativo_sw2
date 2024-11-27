import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = 'http://localhost:3000/emails'; // URL del servidor proxy
  private apiKey = 're_KoTKTHPg_A51Wq2u9rUAhNamVcDXmBSrJ'; // Reemplaza con tu clave de API de Resend

  constructor(private http: HttpClient) { }

  sendEmail(templateParams: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
      from: `Acme <${templateParams.email}>`,
      to: ['78042869ale@gmail.com'], // Dirección de correo electrónico fija
      subject: 'Nuevo mensaje de contacto',
      html: `<p>Nombre: ${templateParams.name}</p><p>Correo Electrónico: ${templateParams.email}</p><p>Mensaje: ${templateParams.message}</p>`
    };

    return this.http.post(this.apiUrl, body, { headers });
  }
}