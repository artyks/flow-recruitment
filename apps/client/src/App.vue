<template>
  <div id="app">
    <base-navigation :routes="routes" />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseNavigation from './common/components/BaseNavigation.vue';
import { routesRaw } from './common/router';

export default defineComponent({
  components: { BaseNavigation },
  data: () => {
    return {
      routes: routesRaw,
    };
  },
});
</script>

<style lang="scss">
#app {
  display: flex;
  flex-flow: column;
  row-gap: 40px;
  margin: 0 50px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}
</style>

<style lang="scss" src="./common/styles/reset.scss"></style>
<style lang="scss" src="./common/styles/style.scss"></style>
