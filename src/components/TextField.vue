<template>
  <div
    class="textField__wrapper"
    :class="{ 'has-error': !!errorMessage, success: meta.valid }"
  >
    <p class="textField__label">{{ label }}</p>
    <input
      :name="name"
      :type="type"
      :value="inputValue"
      v-maska="mask"
      @input="handleChange"
      @blur="handleBlur"
    />
    <p class="help-message" v-show="errorMessage || meta.valid">
      {{ errorMessage || successMessage }}
    </p>
  </div>
</template>

<script setup>
import { toRef } from 'vue';
import { useField } from 'vee-validate';

const props = defineProps({
  label: {
    type: String,
    default: 'text',
  },
  type: {
    type: String,
    default: 'text',
  },
  name: {
    type: String,
    required: true,
  },
  mask: {
    type: String,
  },
  successMessage: {
    type: String,
    default: '',
  },
  value: {
    type: String,
    default: '',
  },
});

const name = toRef(props, 'name');

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(name, undefined, {
  initialValue: props.value,
});

const $emit = defineEmits(['onInputChange']);

function onInput(text) {
  $emit('onInputChange', text);
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/global.scss';

.textField {
  &__wrapper {
    input {
      width: 100%;
      height: 25px;
      border-radius: 5px;
      @include font-format();
    }
  }

  &__label {
    @include font-format($size: 12px, $margin: 20px 0 5px);
  }

  &__error {
    color: red;
  }
}
</style>
