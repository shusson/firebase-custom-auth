import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import * as auth0 from 'auth0-js';
import * as firebase from "firebase";
import {Subject} from "rxjs/Subject";

@Injectable()
export class AuthService {
    uid = '';
    updates = new Subject<string>();

    auth0 = new auth0.WebAuth({
        clientID: 'mcVwIhh03QjPT60sR4tL5lQ200b9OFcy',
        domain: 'shusson.au.auth0.com',
        responseType: 'token id_token',
        audience: 'https://shusson.au.auth0.com/userinfo',
        redirectUri: 'http://localhost:4200',
        scope: 'openid'
    });

    constructor(public router: Router) {}

    public login(): void {
        this.auth0.authorize();
    }

    public handleAuthentication(): void {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                console.log(authResult);
                window.location.hash = '';
                this.setSession(authResult);
                this.uid = authResult.idTokenPayload.sub;
                this.updates.next(this.uid);
                firebase.auth().signInWithCustomToken(authResult.idTokenPayload["http://shusson/firebaseToken"]).then(() => {
                    this.router.navigate(['/']);
                }).catch(function(error) {
                    console.log(error);
                });
            } else if (err) {
                this.router.navigate(['/']);
                console.log(err);
            }
        });
    }

    private setSession(authResult): void {
        // Set the time that the access token will expire at
        const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
    }

    public logout(): void {
        // Remove tokens and expiry time from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        // Go back to the home route
        this.router.navigate(['/']);
    }

    public isAuthenticated(): boolean {
        // Check whether the current time is past the
        // access token's expiry time
        const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }

}
