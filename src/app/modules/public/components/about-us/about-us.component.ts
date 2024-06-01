import { Component } from '@angular/core';

@Component({
  selector: 'hotelmger-about-us',
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {
  members = [
    {
      name: 'Samuel Escobar',
      role: 'Web Developer',
      photo: 'https://libroscontablesgt.web.app/assets/Samuel%20Escobar-08449dcf.jpg',
      social: [
        { type: 'facebook', link: 'https://facebook.com' },
        { type: 'twitter', link: 'https://twitter.com' },
        { type: 'instagram', link: 'https://instagram.com' },
        { type: 'github', link: 'https://github.com' }
      ]
    },
    {
      name: 'Kenneth García',
      role: 'Web Developer',
      photo: 'https://libroscontablesgt.web.app/assets/Kenneth%20Garcia-fed05ae9.jpg',
      social: [
        { type: 'facebook', link: 'https://facebook.com' },
        { type: 'twitter', link: 'https://twitter.com' },
        { type: 'instagram', link: 'https://instagram.com' },
        { type: 'github', link: 'https://github.com' }
      ]
    },
    {
      name: 'Luis Corado',
      role: 'Web Developer',
      photo: 'https://libroscontablesgt.web.app/assets/Luis-c9e87c7e.jpg',
      social: [
        { type: 'facebook', link: 'https://facebook.com' },
        { type: 'twitter', link: 'https://twitter.com' },
        { type: 'instagram', link: 'https://instagram.com' },
        { type: 'github', link: 'https://github.com' }
      ]
    },
    {
      name: 'Jeferson Espina',
      role: 'Web Developer',
      photo: 'https://libroscontablesgt.web.app/assets/Jefferson-b53bcb3e.jpg',
      social: [
        { type: 'facebook', link: 'https://facebook.com' },
        { type: 'twitter', link: 'https://twitter.com' },
        { type: 'instagram', link: 'https://instagram.com' },
        { type: 'github', link: 'https://github.com' }
      ]
    },
  ];
}
