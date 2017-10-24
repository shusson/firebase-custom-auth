import {AfterViewInit, ChangeDetectorRef, Component} from "@angular/core";
import {AuthService} from "./auth.service";
import * as firebase from "firebase";
import 'firebase/firestore';

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent implements AfterViewInit {
    name = '';

    constructor(public auth: AuthService, private cd: ChangeDetectorRef) {
        auth.handleAuthentication();
    }

    ngAfterViewInit(): void {
        const db = firebase.firestore();
        this.auth.updates.subscribe((uid) => {

            const docRef = db.collection("users").doc(uid);

            docRef.get().then(doc => {
                if (doc.exists) {
                    this.name = doc.id;
                    this.cd.detectChanges();
                } else {
                    db.collection("users").doc(uid).set({})
                        .then(() => {
                            this.name = doc.id;
                        })
                        .catch((e) => {
                            console.error("Error writing document: ", e);
                        });
                }
            }).catch(e => {
                console.log("Error getting document:", e);
            });
        });
    }
}
