<template>
    <div>
      
   <navbar/>
  
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
  
  
  </style>
  