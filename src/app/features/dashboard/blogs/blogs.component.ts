import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss'
})
export class BlogsComponent {

  blogs = [
    {
      title: 'Top 5 Common Dental Problems & How To Prevent Them',
      date: '28 Jan 2025',
      author: 'Dr. Admin',
      category: 'Oral Health',
      image: 'assets/blog-1.jpg',
      desc: 'Cavities, gum disease, tooth sensitivity, and bad breath are common issues. Learn how simple habits protect your smile.'
    },
    {
      title: 'Why Regular Dental Checkups Are Important',
      date: '18 Jan 2025',
      author: 'Clinic Team',
      category: 'Dental Care',
      image: 'assets/blog-2.jpg',
      desc: 'Early detection can prevent major dental treatments. Discover why regular checkups save your time and money.'
    },
    {
      title: 'Teeth Whitening: Benefits, Myths & Safe Options',
      date: '10 Jan 2025',
      author: 'Dr. Smith',
      category: 'Cosmetic Dentistry',
      image: 'assets/blog-3.jpg',
      desc: 'Teeth whitening boosts confidence, but not all methods are safe. Learn the best clinic-approved solutions.'
    }
  ];

}


