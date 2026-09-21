import { Injectable, signal } from '@angular/core';

export type ThemeMode = 'dark' | 'light';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly current = signal<ThemeMode>(this.restore());

  constructor() {
    this.apply(this.current());
  }

  toggle(): void {
    this.setTheme(this.current() === 'dark' ? 'light' : 'dark');
  }

  setTheme(theme: ThemeMode): void {
    this.current.set(theme);
    this.apply(theme);
  }

  private apply(theme: ThemeMode): void {
    document.body.classList.toggle('theme-light', theme === 'light');
    document.body.classList.toggle('theme-dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem('shop365_theme', theme);
  }

  private restore(): ThemeMode {
    const raw = localStorage.getItem('shop365_theme');
    return raw === 'light' ? 'light' : 'dark';
  }
}
