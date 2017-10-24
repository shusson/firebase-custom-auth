import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule, MatCardModule, MatIconModule, MatProgressSpinnerModule, MatToolbarModule} from "@angular/material";
import {AuthService} from "./auth.service";
import {RouterModule} from "@angular/router";
import * as firebase from "firebase";
import {environment} from "../environments/environment";

firebase.initializeApp(environment.firebase);

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
        MatCardModule,
        MatProgressSpinnerModule,
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
