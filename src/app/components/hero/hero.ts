import { Component } from '@angular/core';
import { HeroContent } from '../hero-content/hero-content';
import { ContactCard } from '../contact-card/contact-card';

@Component({
  selector: 'app-hero',
  imports: [HeroContent, ContactCard],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {}