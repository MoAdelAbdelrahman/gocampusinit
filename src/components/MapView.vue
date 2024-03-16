<template>
  <div>
    <indoorPopup @directions-updated="handleDirectionsUpdated" @AthbascaCoords="handleAthabascaCoords"
      @getCurrentLocation="handleCurrentLocation" />
      <directionscard @click="toggleFullInstructions" v-if="showFullInstructions" :steps="this.steps" />
    <indoorPopup />
    <button class="LocationBtn" @click="getCurrentLocation">📍</button>
    <button class="GoButton" @click="GoFunction"> Go! </button>
    <button class="instructions" v-if="btnShow" @click="toggleFullInstructions"> ⓘ Show Full Instructions </button>
    <button class="enterBuilding" @click="ToggleEnterBuilding"> 🚪 </button>
    <directionscard @click="ToggleEnterBuilding"  v-if = "showIndoorCard"  :indoorSteps="this.indoorSteps" />
    <guide-card v-if="showGuide" :guide_arr="displayedSteps" />


    <div id="map" />

  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { Threebox } from 'threebox-plugin';
import * as THREE from 'three';

import directionscard from './directions-card.vue'
import indoorPopup from './IndoorPopUp.vue'
import GuideCard from './guide-card.vue';







//map intalization 
const accessToken = 'pk.eyJ1IjoibW9hZGVseCIsImEiOiJjbHJsY3d2Zzcwbm9vMm5veHF1amxpZzNlIn0.41SXOJSpFrr6iPjcgnChGA';
export default {
  name: 'MapView',
  components: {
    directionscard,
    indoorPopup,
    GuideCard,

  },
  data() {
    return {
      steps: [],
      indoorSteps: [],
      currentInstructionIndex: 0,
      displayedSteps: [],
      showFullInstructions: false,
      btnShow: true,
      showIndoorCard: false,
      showGuide: false,

    }
  },

  mounted() {
    if (navigator.geolocation) {
      this.watchID = navigator.geolocation.watchPosition(
        (position) => {
          const currentLocation = [position.coords.longitude, position.coords.latitude];
          if (!this.startLocation) {
            this.startLocation = currentLocation;
            this.intiliazeMap(); // Initialize the map with the current location
          } else {
            console.log('Updating current location');
            console.log(currentLocation);
            this.findNearestStep(currentLocation);
            this.updateCurrentLocationIndicator(currentLocation);
            this.updateDisplayedInstructions() // Update the location indicator on the map
          }
        },
        () => {
          if (!this.startLocation) {
            this.intiliazeMap(); // Initialize with default location if permission denied or an error occurs
          }
          console.log("Unable to retrieve your location.");
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      if (!this.startLocation) {
        this.intiliazeMap(); // Initialize with default location if geolocation is not supported
      }
    }
  },
  beforeUnmount() {
    if (navigator.geolocation && this.watchID) {
      navigator.geolocation.clearWatch(this.watchID);
    }
  },


  methods: {
    GoFunction() {
      document.getElementById('indoorPopup').style.display = 'block';
      this.showGuide = true;
      this.getCurrentLocation();
    },
    showIndoor() {
      this.showIndoorCard = !this.showIndoorCard;
    },
    toggleFullInstructions() {
      this.showFullInstructions = !this.showFullInstructions;
      this.btnShow = !this.btnShow;
    },
    ToggleEnterBuilding() {
      this.showIndoorCard = !this.showIndoorCard;
    },
    
    findNearestStep(currentLocation) {
      let nearestIndex = null;
      let shortestDistance = Infinity;
      console.log('finding nearest step');
      this.steps.forEach((step, index) => {
        const stepLocation = step.maneuver.location;
        const distance = this.calculateDistance(currentLocation, stepLocation);

        if (distance < shortestDistance) {
          shortestDistance = distance;
          nearestIndex = index;
        }
      });

      if (nearestIndex !== null) {
        this.currentInstructionIndex = nearestIndex;
      }
    },


    updateDisplayedInstructions() {
      if (this.steps.length > 0 && this.currentInstructionIndex >= 0) {
    console.log('Updating displayed instructions');
    const updatedSteps = this.steps.slice(this.currentInstructionIndex, this.currentInstructionIndex + 2);
    this.displayedSteps = updatedSteps;
    console.log('Displayed steps updated:', this.displayedSteps);
  } else {
    console.log('No steps available or currentInstructionIndex is invalid');
  }

    },


    //Haversine formula to calculate distance between two points
    calculateDistance(loc1, loc2) {
      function toRadians(degrees) {
        return degrees * Math.PI / 180;
      }

      const R = 6371e3; // meters
      const lat1 = toRadians(loc1[1]);
      const lat2 = toRadians(loc2[1]);
      const deltaLat = toRadians(loc2[1] - loc1[1]);
      const deltaLon = toRadians(loc2[0] - loc1[0]);

      const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(lat1) * Math.cos(lat2) *
        Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      const distance = R * c; // in meters
      return distance;
    },

    handleDirectionsUpdated(directions) {

      this.indoorSteps = directions;

    },


    // Handle the AthbascaCoords event
    handleAthabascaCoords(AthabascaLocation) {
      
      this.map.addLayer({
        id: 'end',
        type: 'circle',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'Point',
                  coordinates: AthabascaLocation
                }
              }
            ]
          }
        },
        paint: {
          'circle-radius': 10,
          'circle-color': '#f30'
        }
      });


      this.getRoute(AthabascaLocation);
     
    },

    handleCurrentLocation() {
     
      this.map.flyTo({
        center: this.startLocation,
        essential: true,
        zoom: 18.5,
      });
    },


    getCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const currentLocation = [position.coords.longitude, position.coords.latitude];
            this.updateLocationAndSteps(currentLocation);
          },
          () => {
            alert("Unable to retrieve your location");
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    },


    updateLocationAndSteps(currentLocation) {
      
      
      this.map.center = currentLocation;
    },


    initializeGeocoder(accessToken) {
      this.map.addControl(
        new MapboxGeocoder({
          accessToken: accessToken,
          mapboxgl: mapboxgl,
          proximity: {
            longitude: -122.25948,
            latitude: 37.87221
          },
          trackProximity: true,
          container: "search-navbar", // This targets the input element in AppNavbar.vue
        })
      );
    },
    updateCurrentLocationIndicator(currentLocation) {

      if (this.map.getSource('current-location')) {
       
        this.map.getSource('current-location').setData({
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: currentLocation,
            },
          }],
        });
      } else {
        this.map.addSource('current-location', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [{
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: currentLocation,
              },
            }],
          },
        });

        this.map.addLayer({
          id: 'current-location',
          type: 'circle',
          source: 'current-location',
          paint: {
            'circle-radius': 13,
            'circle-color': '#007cbf',
          },
        });
      }
    },



    intiliazeMap(start = [-113.5250, 53.5262]) {
      mapboxgl.accessToken = accessToken;

      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-113.5250, 53.5262],
        zoom: 18.5,
        pitch: 70,
        bearing: -90,
        antialias: true

      });


      //canvas for showing glb files
      const tb = (window.tb = new Threebox(
        this.map,
        this.map.getCanvas().getContext('webgl'),
        {
          defaultLights: true,

        }
      ));

      this.map.on('style.load', () => {
        const layers = this.map.getStyle().layers;
        const labelLayerId = layers.find(
          (layer) => layer.type === 'symbol' && layer.layout['text-field']
        ).id;



        this.map.addLayer({
          id: 'custom-threebox-model',
          type: 'custom',
          renderingMode: '3d',
          onAdd: function () {

            const scale = 1;
            const options = {
              obj: '/3dmodels/Athabasca+Hall.glb',

              type: 'glb',
              scale: { x: scale * 1.5, y: scale * 1.5, z: scale },
              units: 'meters',
              rotation: { x: 90, y: -178, z: 0 },
              defaultLights: false,

            };

            tb.loadObj(options, (model) => {
              model.setCoords([-113.5268, 53.5263777]);
              model.setRotation({ x: 0, y: 0, z: 0 });
              // Adjust to get the desired shadow effect
              model.set({ castShadow: true, receiveShadow: true });
              let ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
              let directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
              tb.add(ambientLight);
              tb.add(directionalLight);

              tb.add(model);
            });
          },

          render: function () {
            tb.update();
          }


        });


        this.map.loadImage(
          'https://cdn-icons-png.flaticon.com/512/1432/1432525.png',
          (error, image) => {
            if (error) throw error;
            this.map.addImage('custom-marker', image);
            this.map.addSource('points', {
              type: 'geojson',
              data: {
                type: 'FeatureCollection',
                features: [
                  {
                    type: 'Feature',
                    geometry: {
                      type: 'Point',
                      coordinates: [-113.5266, 53.52671]
                    }
                  }
                ]
              }
            });

          }
        );




        this.map.on('click', (event) => {
          const coords = Object.keys(event.lngLat).map((key) => event.lngLat[key]);
          console.log(coords);
          const end = {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'Point',
                  coordinates: coords
                }
              }
            ]
          };

          if (this.map.getLayer('end')) {
            this.map.getSource('end').setData(end);
          } else {
            this.map.addLayer({
              id: 'end',
              type: 'circle',
              source: {
                type: 'geojson',
                data: {
                  type: 'FeatureCollection',
                  features: [
                    {
                      type: 'Feature',
                      properties: {},
                      geometry: {
                        type: 'Point',
                        coordinates: coords
                      }
                    }
                  ]
                }
              },
              paint: {
                'circle-radius': 10,
                'circle-color': '#f30'
              }
            });
          }
          this.indoorSteps = [];
          this.getRoute(coords);
        });




        // Adding starting point to the map
        this.map.addLayer({
          id: 'point',
          type: 'circle',
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  properties: {},
                  geometry: {
                    type: 'Point',
                    coordinates: start
                  }
                }
              ]
            }
          },
          paint: {
            'circle-radius': 10,
            'circle-color': '#3887be'
          }
        });
        this.map.addLayer(
          {
            'id': 'add-3d-buildings',
            'source': 'composite',
            'source-layer': 'building',
            'filter': ['==', 'extrude', 'true'],
            'type': 'fill-extrusion',
            'minzoom': 10,
            'paint': {
              'fill-extrusion-color': '#fff',
              'fill-extrusion-height': [
                'interpolate',
                ['linear'],
                ['zoom'],
                16,
                20,
                20.05,
                ['get', 'height']
              ],
              'fill-extrusion-base': [
                'interpolate',
                ['linear'],
                ['zoom'],
                15,
                0,
                15.05,
                ['get', 'min_height']
              ],
              'fill-extrusion-opacity': 0.8
            }
          },
          labelLayerId
        );



      });





    },





    async getRoute(end) {
      const query = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/walking/${this.startLocation[0]},${this.startLocation[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
        { method: 'GET' }
      );
      const json = await query.json();
      const data = json.routes[0];
      const steps = data.legs[0].steps;
      //console.log(steps);
      this.updateSteps(steps);
      const route = data.geometry.coordinates;
      const geojson = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: route
        }
      };
      if (this.map.getSource('route')) {
        this.map.getSource('route').setData(geojson);
      }
      else {
        this.map.addLayer({
          id: 'route',
          type: 'line',
          source: {
            type: 'geojson',
            data: geojson
          },
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#3887be',
            'line-width': 5,
            'line-opacity': 0.75
          }
        });
      }



    },
    updateSteps(steps) {

      this.steps = steps;
      this.updateDisplayedInstructions();
    }


  },
}

</script>

<style scoped>
.GoButton:hover .LocationBtn:hover {
  background-color: #fffb00;
  /* Darker green on hover */
  color: black;
}


.LocationBtn {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: #007C41;
  color: white;
  font-size: larger;
  padding: 10px 10px;
  border: none;
  border-radius: 30px;
  /* Rounded corners */
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  /* For icon and text alignment */
  align-items: center;
  /* Center items vertically */
  justify-content: center;
  /* Center items horizontally */

  z-index: 1;
}

.instructions {
  position: absolute;
  bottom: 20px;
  left: 10px;
  background-color: #007C41;
  color: white;
  padding: 15px 15px;
  border: none;
  border-radius: 30px;
  
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  display: flex;
 
  align-items: center;
  
  justify-content: center;
 
  
}

.enterBuilding{
  position: absolute;
  bottom: 80px;
  right: 40px;
  background-color: #007C41;
  color: white;
  padding: 15px 15px;
  border: none;
  border-radius: 30px;
  
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  display: flex;
 
  align-items: center;
  
  justify-content: center;
 
  

}
.GoButton {
  position: absolute;
  bottom: 10px;
  right: 70px;
  background-color: #007C41;
  color: white;
  padding: 15px 15px;
  border: none;
  border-radius: 30px;
  /* Rounded corners */
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  /* For icon and text alignment */
  align-items: center;
  /* Center items vertically */
  justify-content: center;
  /* Center items horizontally */
  /* Space between icon and text */
}





@media (max-width: 600px) {
  .LocationBtn {
    right: 10px;
    /* Closer to the edge on smaller screens */
    bottom: 10px;
    font-size: large;
    padding: 15px;
    /* Slightly smaller padding */
    font-size: 14px;
    /* Smaller font size */
    /* Less gap between icon and text */
  }
}

#map {
  position: absolute;
  top: 60px;
  bottom: 0;
  width: 100%;
  z-index: -99;
}
</style>
