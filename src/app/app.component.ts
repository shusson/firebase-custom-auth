import {AfterViewInit, Component} from "@angular/core";
import {AuthService} from "./auth.service";
import * as firebase from "firebase";
import 'firebase/firestore';

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent implements AfterViewInit {

    constructor(public auth: AuthService) {
        auth.handleAuthentication();
    }

    ngAfterViewInit(): void {
        const db = firebase.firestore();
        this.auth.updates.subscribe(() => {

            const docRef = db.collection("users").doc(this.auth.uid);

            docRef.get().then(function(doc) {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                } else {
                    console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
        });
    }
}
