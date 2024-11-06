<template>
    <div>
      
  
  
   <mapView/>
  
  
   
   
  </div>
   
   
  </template>
  
  
  <script>
  

  import mapView from './MapView.vue'
  
  
  
  
  
  export default {
    name: 'home-view',
    components: {
      mapView,
     
     
      
     
      
    },
    methods: {
      goToHome(){
        this.$router.push('/')
      },
      }
    }
  
  
  </script>
  
  <style>
  
  .nav{
    position: absolute;
    top: 2.5%;
    left: 0;
    right: 0;
   
  }

  .map{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
  }
  </style>
  