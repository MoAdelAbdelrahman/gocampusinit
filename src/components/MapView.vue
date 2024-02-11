<template>
  <div>
    <directionscard :steps="this.steps" />
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

const start =[-113.5250, 53.5262];



  //map intalization 
const accessToken = 'pk.eyJ1IjoibW9hZGVseCIsImEiOiJjbHJsY3d2Zzcwbm9vMm5veHF1amxpZzNlIn0.41SXOJSpFrr6iPjcgnChGA';
export default{
        name: 'MapView', 
        components: {
                directionscard,
        },
        mounted(){
                this.intiliazeMap();    
                
        },
        data(){
                return{
                        steps: [],
                }
        },
        
        methods: {
        intiliazeMap(){
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

        
          console.log('style loaded');  
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
        console.log(model);
        tb.add(model);
        });
        },
        
        render: function () {
        tb.update();
        }
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

        

        

        this.map.addControl(
                new MapboxGeocoder({
                accessToken: accessToken,
                mapboxgl: mapboxgl,
                proximity: {
                longitude: -122.25948,
                latitude: 37.87221
                },
                trackProximity: true
                
                })
                );
        },

        
        
       
        
        async getRoute(end){
                const query = await fetch(
                `https://api.mapbox.com/directions/v5/mapbox/walking/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
                { method: 'GET' }
                );
                const json = await query.json();
                const data = json.routes[0];
                const steps = data.legs[0].steps;
                console.log(steps);
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

#map {
  position: absolute;
  top: 60px;
  bottom: 0;
  width: 100%;
  z-index: -99;
}
</style>
