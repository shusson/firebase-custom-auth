import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import * as auth0 from 'auth0-js';
import * as firebase from "firebase";
import {Subject} from "rxjs/Subject";

@Injectable()
export class AuthService {
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
                window.location.hash = '';
                this.setSession(authResult);
                this.initSession();
            } else if (err) {
                this.router.navigate(['/']);
                console.log(err);
            } else {
                this.initSession();
            }
        });
    }

    private setSession(authResult): void {
        const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('firebase_token', authResult.idTokenPayload["http://shusson/firebaseToken"]);
        localStorage.setItem('expires_at', expiresAt);
    }

    public initSession() {
        const ft = localStorage.getItem('firebase_token');
        if (ft) {
            firebase.auth().signInWithCustomToken(ft).then((user: firebase.User) => {
                this.router.navigate(['/']);
                this.updates.next(user.uid);
            }).catch(function(e) {
                console.log(e);
            });
        }
    }

    public logout(): void {
        localStorage.removeItem('expires_at');
        localStorage.removeItem('firebase_token');
        firebase.auth().signOut().catch(e => {
            console.log(e);
        });
        window.location.reload();
    }

    public isAuthenticated(): boolean {
        // Check whether the current time is past the
        // access token's expiry time
        const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }

}
