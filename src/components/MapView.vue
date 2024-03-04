<template>
  <div>
    <indoorPopup/>
  <directionscard :steps="this.steps" />
  <indoorPopup/>
  <button class="LocationBtn" @click="getCurrentLocation">📍 Use Current Location</button>


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







  //map intalization 
const accessToken = 'pk.eyJ1IjoibW9hZGVseCIsImEiOiJjbHJsY3d2Zzcwbm9vMm5veHF1amxpZzNlIn0.41SXOJSpFrr6iPjcgnChGA';
export default{
        name: 'MapView', 
        components: {
                directionscard,
                indoorPopup,
                
        },
        data(){
                return{
                        steps: [],
                        
                }
        },

          mounted() {
    if (navigator.geolocation) {
      this.watchID = navigator.geolocation.watchPosition(
        (position) => {
          const currentLocation = [position.coords.longitude, position.coords.latitude];
          if (!this.startLocation) {
            this.startLocation = currentLocation;
            this.intiliazeMap(currentLocation); // Initialize the map with the current location
          } else {
            this.updateCurrentLocationIndicator(currentLocation); // Update the location indicator on the map
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
          getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLocation = [position.coords.longitude, position.coords.latitude];
          this.map.flyTo({
            center: currentLocation,
            essential: true, 
            zoom: 18.5,
          });

          
          this.startLocation = currentLocation;
         
          if (this.map.getSource('start')) {
            this.map.getSource('start').setData({
              type: 'FeatureCollection',
              features: [{
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: currentLocation,
                },
              }],
            });
          }
        },
        () => {
          alert("Unable to retrieve your location");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
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
            'circle-radius': 10,
            'circle-color': '#007cbf',
          },
        });
      }
    },
        
  

        intiliazeMap(start = [-113.5250, 53.5262]){
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

        this.initializeGeocoder(accessToken);
          
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
            this.map.addLayer({
              id: 'enteryToAthabascaHall',
              type: 'symbol',
              source: 'points',
              layout: {
                'icon-image': 'custom-marker',
                'icon-allow-overlap': true,
                'icon-size': 0.1
              }
            });
          }
        );
        //on click enter
        this.map.on('click', 'enteryToAthabascaHall', () => {
          document.getElementById('indoorPopup').style.display = 'block';
      });
        

        this.map.on('click', (event) => {
        const coords = Object.keys(event.lngLat).map((key) => event.lngLat[key]);
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

        
        
       
        
        async getRoute(end){
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
        updateSteps(steps){
            this.steps = steps;
        }
        
       
},
}

</script>

<style>

.LocationBtn {
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 1;
  background-color: #007C41;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 30px; /* Rounded corners */
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  display: flex; /* For icon and text alignment */
  align-items: center; /* Center items vertically */
  justify-content: center; /* Center items horizontally */
  gap: 8px; /* Space between icon and text */
}

.LocationBtn:hover {
  background-color: #005a2e; /* Darker shade for hover effect */
}


@media (max-width: 600px) {
  .LocationBtn {
    right: 10px; /* Closer to the edge on smaller screens */
    bottom: 10px;
    width: 30%;
    padding: 8px 16px; /* Slightly smaller padding */
    font-size: 14px; /* Smaller font size */
    gap: 5px; /* Less gap between icon and text */
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
