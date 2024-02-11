<template>
    
        <div class = 'mainDiv'>
            <ul>
        <li v-for="(step, index) in steps" :key="index">{{ step.maneuver.instruction }}</li>
      </ul>
    </div>
    
</template>

<script>
    export default {
        name: 'directions-card',
        components: {
            
        },
        props: {
          steps:Array,  
        },
    }
</script>

<style scoped>
.mainDiv{
  position: absolute;
  margin: auto;
  width: 25%;
  top: 10%;
  bottom: 60%;
  overflow: auto;
  padding: 20px;
  background-color: #fff;
  overflow-y: scroll;
  font-family: sans-serif;
}
.mainDiv ul{
  list-style-type: none;
  padding: 0;
}

.mainDiv li{
  padding: 18px;
  border-bottom: 1px solid #ddd;
  font-size: 100%;
}
</style>