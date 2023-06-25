<template>
  <div class="choice-group">
    <div v-for="option in options" :key="option" class="choice-group__element">
      <label class="form-control">
        <input type="radio" v-model="value" :value="option" />
        {{ option }}
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  props: {
    options: {
      type: Array<string>,
      required: true,
    },
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
    const value = ref(props.initialValue);
    watch(value, (newValue) => {
      if (newValue === undefined) {
        return;
      }
      emit('update:value', newValue);
    });
    return { value };
  },
});
</script>

<style lang="scss" scoped>
.choice-group {
  display: flex;
  column-gap: 20px;

  .form-control {
    font-family: system-ui, sans-serif;
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.1;
    display: grid;
    grid-template-columns: 1em auto;
    gap: 0.5em;
    cursor: pointer;
  }

  .form-control + .form-control {
    margin-top: 1em;
  }

  .form-control:focus-within {
    color: #16205e;
  }

  input[type='radio'] {
    /* Add if not using autoprefixer */
    -webkit-appearance: none;
    /* Remove most all native input styles */
    appearance: none;
    /* For iOS < 15 */
    background-color: #e8f4ff;
    /* Not removed via appearance */
    margin: 0;

    font: inherit;
    color: currentColor;
    width: 1.15em;
    height: 1.15em;
    border: 0.15em solid currentColor;
    border-radius: 50%;
    transform: translateY(-0.075em);

    display: grid;
    place-content: center;

    cursor: pointer;
  }

  input[type='radio']::before {
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

  input[type='radio']:checked::before {
    transform: scale(1);
  }

  input[type='radio']:hover {
    outline: max(2px, 0.15em) solid currentColor;
    outline-offset: max(2px, 0.15em);
  }
}
</style>
