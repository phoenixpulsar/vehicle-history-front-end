<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="svg">
      <img :src="mySVG" />
    </div>
  </div>
</template>
<script>
import mySVG from "@/assets/SVG_CARS/CAR-03.svg";
// @ is an alias to /src

export default {
  name: "About",
  data() {
    return {
      mySVG,
    };
  },

  methods: {},
};
</script>
<style lang="scss" scoped>
.svg {
  height: 300px;
  width: 300px;
}
</style>
