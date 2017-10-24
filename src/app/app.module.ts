import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule, MatIconModule, MatSelectModule, MatToolbarModule} from "@angular/material";
import {AuthService} from "./auth.service";
import {RouterModule} from "@angular/router";
import * as firebase from "firebase";


const config = {
    apiKey: "AIzaSyCMQNwxeO9jtR-aedfVjYF4iwz4Opwczp8",
    authDomain: "custom-auth-d9c94.firebaseapp.com",
    databaseURL: "https://custom-auth-d9c94.firebaseio.com",
    projectId: "custom-auth-d9c94",
    storageBucket: "custom-auth-d9c94.appspot.com",
    messagingSenderId: "710858655867"
};
firebase.initializeApp(config);

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        RouterModule.forRoot(
            [
                { path: '*', component: AppComponent },
            ]
        )
    ],
    providers: [
        AuthService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
