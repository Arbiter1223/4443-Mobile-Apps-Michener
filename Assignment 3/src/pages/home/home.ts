import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import * as firebase from 'firebase';

declare var google;
 
  // Initialize Firebase
  firebase.initializeApp({
    apiKey: "AIzaSyDT7h_ANMDlWC7Nmh8rtmRMUnq-FzhK1IU",
    authDomain: "geoloc-assign-cory-brent.firebaseapp.com",
    databaseURL: "https://geoloc-assign-cory-brent.firebaseio.com",
    projectId: "geoloc-assign-cory-brent",
    storageBucket: "geoloc-assign-cory-brent.appspot.com",
    messagingSenderId: "66582767101"
  });
    
  // Initialize Cloud Firestore through Firebase
  var db = firebase.firestore();
    
  // Disable deprecated features
  db.settings({
  timestampsInSnapshots: true
  }); 

  var idNum = 1223;
  var point = [0.0,0.0];

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
 
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public geolocation: Geolocation) {
 
  }
 
  ionViewDidLoad(){
    this.loadMap();
  }
 
  loadMap(){
 
    this.geolocation.getCurrentPosition().then((position) => {
 
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
    }, (err) => {
      console.log(err);
    });
 
  }
  
  addMarker(){
 
  let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: this.map.getCenter()
  });
 
  let content = "<h4>Information!</h4>";          
 
  this.addInfoWindow(marker, content);

  // Get date
  var currentDate = (new Date()).toISOString();

  // Get location
  this.geolocation.getCurrentPosition().then((pos) => {
    point = [pos.coords.latitude, pos.coords.longitude];

    // Save location information to Firebase
    this.writeLocationData(idNum, point, currentDate)
   }).catch((error) => {
     console.log('Error getting location', error);
   });
  }

  addInfoWindow(marker, content){
 
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
 
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
 
  }
 
  // Function to write user information to Firebase
  writeUserData(id, first, last, email) {
    db.collection("users").add({
      id: id,
      first: first,
      last: last,
      email: email
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
  }

  // Function to write location information to Firebase
  writeLocationData(id, point, time)
  {
    db.collection("locations").add({
      id: id,
      point: point,
      time: time
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
  }
}