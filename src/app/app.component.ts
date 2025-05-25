import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';
import * as AOS from 'aos';

declare var google: any;

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
      once: true,
      duration: 1800,
    });
    this.agregarStarts();
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

  agregarStarts(){
    const starsContainer = document.querySelector('.stars-container');
    const numberOfStars = 150; // Ajusta este número según la densidad que desees

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        // Posición aleatoria
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;

        // Retraso de animación aleatorio para que parpadeen de forma desincronizada
        star.style.animationDelay = `${Math.random() * 2}s`;

        // Tamaño aleatorio (opcional, para variación)
        const size = Math.random() * 2 + 1; // Entre 1px y 3px
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        // Opacidad inicial aleatoria para que no todas aparezcan a la vez
        star.style.opacity = Math.random().toString();

        starsContainer?.appendChild(star);
    }
  }

}
