<template>
  <div id="scene-container">
    <!-- Our <canvas> will be inserted here -->
  </div>
</template>

<script lang="ts" >

import { World } from './World.ts';


export default {
  name: "Index",
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.main().catch((err) => {
        console.error(err);
      });
    },
    async main() {
      // Get a reference to the container element
      const container = document.querySelector('#scene-container');
      console.log(container)

      // create a new world
      const world = new World(container);

      // complete async tasks
      await world.init();

      // start the animation loop
      world.start();
    }
  }
}



</script>

<style lang="scss" scoped>
body {
  /* remove margins and scroll bars */
  margin: 0;
  overflow: hidden;

  /* style text */
  text-align: center;
  font-size: 12px;
  font-family: Sans-Serif;

  /* color text */
  color: #444;
}

h1 {
  /* position the heading */
  position: absolute;
  width: 100%;

  /* make sure that the heading is drawn on top */
  z-index: 1;
}

#scene-container {
  /* tell our scene container to take up the full page */
  position: absolute;
  width: 100%;
  height: 100%;

  /*
    Set the container's background color to the same as the scene's
    background to prevent flashing on load
  */
  background-color: skyblue;
}

</style>