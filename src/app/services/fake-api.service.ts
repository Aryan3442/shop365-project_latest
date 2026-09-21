import { Injectable } from '@angular/core';
import { AppUser } from '../models/product.model';

type StoredUser = AppUser & { password: string };

@Injectable({ providedIn: 'root' })
export class FakeApiService {
  private readonly usersKey = 'shop365_fake_users';
  private readonly sessionKey = 'shop365_user';

  async signUp(payload: { name: string; email: string; password: string }): Promise<AppUser> {
    await this.delay(500);

    const name = payload.name.trim();
    const email = payload.email.trim().toLowerCase();
    const password = payload.password;

    if (!name || !email || !password.trim()) {
      throw new Error('Please complete all fields to create your account.');
    }

    const users = this.getUsers();
    if (users.some(user => user.email.toLowerCase() === email)) {
      throw new Error('An account with this email already exists. Please sign in instead.');
    }

    const newUser: StoredUser = {
      id: 'e_' + crypto.randomUUID(),
      name,
      email,
      provider: 'email',
      password
    };

    users.push(newUser);
    localStorage.setItem(this.usersKey, JSON.stringify(users));

    const sessionUser: AppUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      provider: newUser.provider
    };

    localStorage.setItem(this.sessionKey, JSON.stringify(sessionUser));
    return sessionUser;
  }

  async login(payload: { email: string; password: string }): Promise<AppUser> {
    await this.delay(500);

    const email = payload.email.trim().toLowerCase();
    const password = payload.password;

    if (!email || !password.trim()) {
      throw new Error('Please enter your email and password.');
    }

    const users = this.getUsers();
    const matchedUser = users.find(user => user.email.toLowerCase() === email && user.password === password);

    if (!matchedUser) {
      throw new Error('Invalid email or password. Please try again or create a new account.');
    }

    const sessionUser: AppUser = {
      id: matchedUser.id,
      name: matchedUser.name,
      email: matchedUser.email,
      provider: matchedUser.provider
    };

    localStorage.setItem(this.sessionKey, JSON.stringify(sessionUser));
    return sessionUser;
  }

  async socialLogin(provider: 'google' | 'apple'): Promise<AppUser> {
    await this.delay(600);

    const user: AppUser = {
      id: provider === 'google' ? 'g_' + crypto.randomUUID() : 'a_' + crypto.randomUUID(),
      name: 'Aryan Sharma',
      email: provider === 'google' ? 'aryan.sharma@gmail.com' : 'aryan.sharma@icloud.com',
      photoUrl: provider === 'google' ? 'https://i.pravatar.cc/100?img=15' : undefined,
      provider
    };

    localStorage.setItem(this.sessionKey, JSON.stringify(user));
    return user;
  }

  getSessionUser(): AppUser | null {
    const raw = localStorage.getItem(this.sessionKey);
    return raw ? JSON.parse(raw) as AppUser : null;
  }

  logout(): void {
    localStorage.removeItem(this.sessionKey);
  }

  private getUsers(): StoredUser[] {
    const raw = localStorage.getItem(this.usersKey);
    return raw ? JSON.parse(raw) as StoredUser[] : [];
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
