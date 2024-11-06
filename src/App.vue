<template>
  <div id="app">
    <nav class="navbar">
      <RouterLink to="/ar"> AR MODE</RouterLink>
      <!-- Additional navigation links can be added here -->
    </nav>
    
    <!-- Main Content Area for Routes -->
    <div class="content-wrapper">
      <RouterView />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
/* Basic reset and layout */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Arial, sans-serif;
  height: 100vh; /* Full viewport height */
  display: flex;
  flex-direction: column;
}

.navbar {
  background-color: #007C41; /* Navbar color */
  padding: 5px;
  margin: auto;
  text-align: center;
}

.navbar a {
  color: rgb(238, 238, 238);
  text-decoration: none;
  font-weight: bold;
  padding: 5px 10px;
}

.content-wrapper {
  flex: 1; /* Takes remaining space */
  position: relative;
  overflow: hidden; /* Avoids unintended scroll */
  z-index: 1; /* Ensure it’s layered properly */
}

#map {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0; /* Ensures map is interactable */
}
</style>
