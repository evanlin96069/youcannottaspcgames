import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContentComponent } from './content/content.component';

import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ContentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  ngOnInit(): void {
    AOS.init();
  }
}
