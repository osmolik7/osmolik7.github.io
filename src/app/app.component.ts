import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  aboutIsVisible: boolean = false;
  projectsIsVisible: boolean = false;
  experienceIsVisible: boolean = false;
  educationCertificaciontsIsVisible: boolean = false;
  skillsIsVisible: boolean = false;
  getInTouchIsVisible: boolean = false;

  currentYear: number = new Date().getFullYear();
  
  @ViewChild('about') about!: ElementRef;
  @ViewChild('projects') projects!: ElementRef;
  @ViewChild('experience') experience!: ElementRef;
  @ViewChild('educationCertifications') educationCertifications!: ElementRef;
  @ViewChild('skills') skills!: ElementRef;
  @ViewChild('getInTouch') getInTouch!: ElementRef;
  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.target === this.about.nativeElement) {
          this.aboutIsVisible = entry.isIntersecting;
        }
        if (entry.target === this.projects.nativeElement) {
          this.projectsIsVisible = entry.isIntersecting;
        }
        if (entry.target === this.experience.nativeElement) {
          this.experienceIsVisible = entry.isIntersecting;
        }
        if (entry.target === this.educationCertifications.nativeElement) {
          this.educationCertificaciontsIsVisible = entry.isIntersecting;
        }
        if (entry.target === this.skills.nativeElement) {
          this.skillsIsVisible = entry.isIntersecting;
        }
        if (entry.target === this.getInTouch.nativeElement) {
          this.getInTouchIsVisible = entry.isIntersecting;
        }
      });
    }, {
      threshold: 0.8 // Puedes ajustar el porcentaje visible necesario
    });

    observer.observe(this.about.nativeElement);
    observer.observe(this.projects.nativeElement);
    observer.observe(this.experience.nativeElement);
    observer.observe(this.educationCertifications.nativeElement);
    observer.observe(this.skills.nativeElement);
    observer.observe(this.getInTouch.nativeElement);
  }

  ngOnInit(): void {
    AOS.init({
      duration: 1800, // Valor por defecto para todos si no se define individualmente
    });
  }
  title = 'portfolio';


  //Para el boton flotante subir
  showScrollTopButton = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollTopButton = window.scrollY > 300;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  

  //Para enviar correos 
  //para la section del contacto
  sendEmail(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    emailjs.sendForm(
      'service_gboyx6z',
      'template_kuhvi2q',
      e.target as HTMLFormElement,
      '21BKfxFL9DKUjYe0C'
    )
    .then(() => {
      // alert('Mensaje enviado correctamente');
      Swal.fire({
        title: "Mensaje enviado correctamente",
        icon: "success",
        draggable: true
      });
      form.reset();
    })
    .catch(() => {
      // alert('Hubo un error al enviar tu mensaje');
      Swal.fire({
        title: "Hubo un error al enviar tu mensaje",
        icon: "error",
        draggable: true
      });
      form.reset();
    });
  }
}
