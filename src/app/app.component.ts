import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

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
    AOS.init();
  }
  title = 'portfolio';

}
