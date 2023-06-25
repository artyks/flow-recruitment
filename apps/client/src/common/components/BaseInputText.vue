<template>
  <input type="text" v-model="value" class="text-input" />
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  props: {
    initialValue: {
      type: String,
      required: false,
    },
  },
  emits: {
    'update:value': (newValue: string) => {
      return !!{ newValue };
    },
  },
  setup(props, { emit }) {
    const value = ref(props.initialValue || '');
    watch(value, (newValue) => {
      emit('update:value', newValue);
    });
    return { value };
  },
});
</script>

<style lang="scss" scoped>
.text-input {
  height: 45px;
  padding: 0 21px 2px 21px;

  border: 2px solid rgba(22, 32, 94, 0.8);
  border-radius: 20px;

  transition: border-radius 0.25s;
}

.text-input::before {
  content: '';
  width: 0.65em;
  height: 0.65em;
  border-radius: 50%;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1em 1em #16205e;
  /* Windows High Contrast Mode */
  background-color: CanvasText;
}

.text-input:hover {
  outline: max(2px, 0.15em) solid currentColor;
  outline-offset: max(2px, 0.15em);
}

.text-input:focus {
  background-color: #fff;
}
</style>
