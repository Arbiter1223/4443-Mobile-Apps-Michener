import { Injectable } from '@angular/core';

@Injectable()
export class Config {
	public wordpressApiUrl = 'http://demo.titaniumtemplates.com/wordpress/?json=1';
}

// Initialize Firebase
export const firebaseConfig = {
	fire: {
		apiKey: "AIzaSyDT7h_ANMDlWC7Nmh8rtmRMUnq-FzhK1IU",
		authDomain: "geoloc-assign-cory-brent.firebaseapp.com",
		databaseURL: "https://geoloc-assign-cory-brent.firebaseio.com",
		projectId: "geoloc-assign-cory-brent",
		storageBucket: "geoloc-assign-cory-brent.appspot.com",
		messagingSenderId: "66582767101"
	}
};
