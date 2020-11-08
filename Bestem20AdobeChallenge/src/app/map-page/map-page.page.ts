//import { Component/*, OnInit */} from '@angular/core';
//import { Plugins } from '@capacitor/core';
//const { Geolocation } = Plugins;

//import { Geolocation } from '@ionic-native/geolocation/ngx'

//constructor (private geolocation: Geolocation)  { }

//@Component({
//  selector: 'app-map-page',
//  templateUrl: './map-page.page.html',
//  styleUrls: ['./map-page.page.scss'],
//})
//export class MapPagePage /*implements OnInit*/ {
  
//  coords: any;
//  constructor () { }
//  async locate() {
//    const coordinates = await this.Geolocation.getCurrentPosition();
 //   this.coords = coordinates.coords;
//  }

  /*ngOnInit() {
  }
  */
 import { Component, OnInit, OnDestroy } from '@angular/core';
 import * as Leaflet from 'leaflet';
 import { antPath } from 'leaflet-ant-path';
 import { Plugins } from '@capacitor/core';
 const { Geolocation } = Plugins;
 
 @Component({
   selector: 'app-map-page',
   templateUrl: './map-page.page.html',
   styleUrls: ['./map-page.page.scss']
 })

 export class MapPagePage implements OnDestroy {
   map: Leaflet.Map;
   coords : any;
   constructor() { }
   //async locate(){
   //  const coordinates = await Geolocation.getCurrentPosition();
   //  this.coords = coordinates.coords;
   //}
 
   ngOnInit() { }
   ionViewDidEnter() { this.leafletMap(); }
 
   leafletMap() {
     this.map = Leaflet.map('mapId').setView([44.423785, 26.107489], 7);
     Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
       attribution: ' © Angular LeafLet',
     }).addTo(this.map);
     //this.locate();
     //function onLocationFound(e) {
     // Leaflet.marker([e.latlng]).addTo(this.map).bindPopup('casa').openPopup();
    //}
    this.map.locate({setView: true, maxZoom: 16})
    .on('locationfound', function(e){
      Leaflet.marker([e.latitude,e.longitude]).addTo(this.map).bindPopup('casa').openPopup();
    });
    function onLocationFound(e){
      var lat = e.latlng.lat;
      var lon = e.latlng.lng;
      Leaflet.marker([lat,lon]).addTo(Map).bindPopup('new marker').openPopup();
    }
    /*Map.on('click',(e)=>{onLocationFound(e)});*/
      
    // Leaflet.marker([this.coords.latitude, this.coords.longitude]).addTo(this.map).bindPopup('Bucuresti').openPopup();
     //Leaflet.marker([44.92, 26.02]).addTo(this.map).bindPopup('Ploiesti').openPopup();
 
     antPath([[44.42, 26.10], [44.92, 26.02]],
       { color: '#FF0000', weight: 5, opacity: 0.6 })
       .addTo(this.map);
   }

   //* Remove map when we have multiple map object 
   ngOnDestroy() {
     this.map.remove();
   }
  }