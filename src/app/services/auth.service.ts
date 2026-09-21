import { Injectable, signal } from '@angular/core';
import { AppUser } from '../models/product.model';
import { FakeApiService } from './fake-api.service';

/**
 * REAL INTEGRATION NOTES
 * -----------------------------------------------------------------------
 * GOOGLE:
 *   1. npm i @abacritt/angularx-social-login
 *   2. Create an OAuth Client ID at https://console.cloud.google.com/apis/credentials
 *   3. Provide it via SocialAuthServiceConfig in app.config.ts:
 *        providers: [
 *          {
 *            provide: 'SocialAuthServiceConfig',
 *            useValue: {
 *              autoLogin: false,
 *              providers: [
 *                { id: GoogleLoginProvider.PROVIDER_ID, provider: new GoogleLoginProvider('YOUR_GOOGLE_CLIENT_ID') }
 *              ]
 *            }
 *          }
 *        ]
 *   4. Inject SocialAuthService and call signIn(GoogleLoginProvider.PROVIDER_ID)
 *
 * APPLE:
 *   1. Register a Services ID at https://developer.apple.com/account/resources/identifiers
 *   2. Load Apple's JS SDK in index.html:
 *        <script src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"></script>
 *   3. Init once at bootstrap:
 *        window.AppleID.auth.init({ clientId: 'YOUR_SERVICES_ID', scope: 'name email',
 *          redirectURI: 'https://yourdomain.com/auth/apple/callback', usePopup: true });
 *   4. Call window.AppleID.auth.signIn() and read the returned id_token on your backend
 *      to verify + create a session (Apple sign-in MUST be verified server-side).
 *
 * Both providers ultimately need a backend endpoint (e.g. POST /api/auth/social) that
 * verifies the token and returns your own session/JWT — never trust the client-side
 * token alone for authorization.
 *
 * Until that backend exists, this service simulates both flows so the UI is fully
 * clickable and functional end-to-end.
 * -----------------------------------------------------------------------
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly currentUser = signal<AppUser | null>(null);

  constructor(private fakeApi: FakeApiService) {
    this.currentUser.set(this.restore());
  }

  get isLoggedIn(): boolean {
    return this.currentUser() !== null;
  }

  async signInWithGoogle(): Promise<void> {
    const user = await this.fakeApi.socialLogin('google');
    this.setUser(user);
  }

  async signInWithApple(): Promise<void> {
    const user = await this.fakeApi.socialLogin('apple');
    this.setUser(user);
  }

  async signUpWithEmail(name: string, email: string, password: string): Promise<void> {
    const user = await this.fakeApi.signUp({ name, email, password });
    this.setUser(user);
  }

  async signInWithEmail(email: string, password: string): Promise<void> {
    const user = await this.fakeApi.login({ email, password });
    this.setUser(user);
  }

  signOut(): void {
    this.fakeApi.logout();
    this.currentUser.set(null);
  }

  private setUser(user: AppUser) {
    localStorage.setItem('shop365_user', JSON.stringify(user));
    this.currentUser.set(user);
  }

  private restore(): AppUser | null {
    return this.fakeApi.getSessionUser();
  }
}
