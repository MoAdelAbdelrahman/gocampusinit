<template>
  <div>
 <navbar/>
 <MapView/>
 
</div>
 
 
</template>


<script>
import MapView from './components/MapView.vue'
import navbar from './components/app-navbar.vue'


export default {
  name: 'App',
  components: {
    MapView,
    navbar,
    
  }
}

</script>

<style>

</style>
