import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <main class="animate-fade">
      <router-outlet></router-outlet>
    </main>
    <footer class="site-footer">
      <div class="container">© {{ year }} Shop365. Crafted for Him &amp; Her.</div>
    </footer>
  `,
  styles: [`
    main { min-height: 70vh; }
    .site-footer {
      border-top: 1px solid var(--color-border);
      padding: 28px 0;
      color: var(--color-muted);
      font-size: 13px;
      text-align: center;
      margin-top: 60px;
    }
  `]
})
export class AppComponent {
  year = new Date().getFullYear();
}
