import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailService } from './email.service';
import { EmailJSResponseStatus } from 'emailjs-com';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [ ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {


  contactForm!: FormGroup;
  chatVisible: boolean = false;
  chatMessage: string = '';
onboarding: any;
  constructor(private fb: FormBuilder,private emailService:EmailService) { }
  ngOnInit() {
  
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['onboarding@resend.dev', [Validators.required,Validators.email]],
      message: ['', Validators.required]
    });
  
  }
  toggleChat() {
    this.chatVisible = !this.chatVisible;
  }

  
  
  sendWhatsAppMessage() {
    const phoneNumber = '59179803692'; // Reemplaza con tu número de WhatsApp
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(this.chatMessage)}`;
    window.open(url, '_blank');
    this.chatMessage = ''; // Limpiar el mensaje después de enviarlo
    this.toggleChat(); // Cerrar el chat después de enviar el mensaje
  }


  sendEmail() {
    if (this.contactForm.valid) {
      const templateParams = {
        name: this.contactForm.get('name')?.value,
        email: this.contactForm.get('email')?.value,
        message: this.contactForm.get('message')?.value
      };

      this.emailService.sendEmail(templateParams).subscribe(
        response => {
          console.log('Correo enviado con éxito!', response);
          alert('Correo enviado con éxito!');
          this.contactForm.reset();
        },
        error => {
          console.error('Error al enviar el correo:', error);
          alert('Error al enviar el correo.');
          this.contactForm.reset();
        }
      );
    } else {
      alert('Por favor, completa todos los campos del formulario.');
    }
  }
  

}
