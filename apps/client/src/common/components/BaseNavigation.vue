<template>
  <nav class="navigation">
    <!-- eslint-disable-next-line vue/no-v-for-template-key -->
    <template v-for="route in routes" :key="route.name">
      <RouterLink v-if="route.label" :to="{ name: route.name }" class="navigation__link">{{ route.label }}</RouterLink>
    </template>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouteRaw } from '../router/index';

export default defineComponent({
  props: {
    routes: {
      type: Array<RouteRaw>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.navigation {
  display: flex;
  height: 80px;
  width: 100%;
  justify-content: center;
  align-items: center;
  column-gap: 40px;

  .navigation__link {
    font-size: 25px;
    font-weight: 300;
    cursor: pointer;
  }

  .navigation__link:hover {
    font-weight: 500;
    text-decoration: underline;
  }
}
</style>
