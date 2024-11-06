<template>
    <div>
      
   <navbar class="nav"/>
  
   <mapView/>
  
  
   
   
  </div>
   
   
  </template>
  
  
  <script>
  
  import navbar from './app-navbar.vue'
  import mapView from './MapView.vue'
  
  
  
  
  
  export default {
    name: 'home-view',
    components: {
      mapView,
      navbar,
     
      
     
      
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
    top: 20;
    left: 0;
    right: 0;
   
  }

  .map{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }
  </style>
  