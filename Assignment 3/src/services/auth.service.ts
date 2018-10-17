import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;
import { HomePage } from '../pages/home/home';

var db = firebase.firestore();

@Injectable()
export class AuthService
{
    private user: firebase.User;

    constructor(public afAuth: AngularFireAuth)
    {
        afAuth.authState.subscribe(user => {
            this.user = user;
        });
    }

    signInWithEmail(credentials)
    {
        console.log('Sign in with email');
        return this.afAuth.auth.signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        );
    }

    signup(credentials)
    {
        // Give the user a random id number
        var random = (Math.floor(Math.random() * 10) + Math.floor(Math.random() * 100) + Math.floor(Math.random() * 1000));
        // Add user "Luke Skywalker" to "users" collection in Firebase
        this.writeUserData(random, "Luke", "Skywalker", credentials.email);
        // Register user in Firebase
        return this.afAuth.auth.createUserWithEmailAndPassword(
            credentials.email,
            credentials.password
        );
    }

    // Function to write user information to Firebase
    writeUserData(id, first, last, email)
    {
        db.collection("users").add({
            id: id,
            first: first,
            last: last,
            email: email
        })
        .then(function(docRef)
        {
            // If successful, output success message to console
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error)
        {
            // If unsuccessful, output error message to console
            console.error("Error adding document: ", error);
        });
    }

    get authenticated(): boolean
    {
        return this.user !== null;
    }

    getEmail()
    {
        return this.user && this.user.email;
    }
    
    signOut(): Promise<void>
    {
        return this.afAuth.auth.signOut();
    }

    // BUG
    // Function to implement Google sign in
    
    /*

    signInWithGoogle()
	{
		console.log('Sign in with google');
		return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());
	}

	private oauthSignIn(provider: AuthProvider)
	{
		if (!(<any>window).cordova)
			return this.afAuth.auth.signInWithPopup(provider);
		else
		{
			return this.afAuth.auth.signInWithRedirect(provider).then(() =>
			{
				return this.afAuth.auth.getRedirectResult().then( result =>
				{
					// This gives you a Google Access Token.
					// You can use it to access the Google API.
					let token = result.credential.accessToken;
					// The signed-in user info.
					let user = result.user;
					console.log(token, user);
				}).catch(function(error)
				{
					// Handle Errors here.
					alert(error.message);
				});
			});
		}
    }
    
    */

}