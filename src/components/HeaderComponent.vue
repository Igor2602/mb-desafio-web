<template>
  <div class="wrraper__header">
    <div>
      <button @click="changeLocale('pt-BR')">Português</button>
      <button @click="changeLocale('en')">Inglês</button>
    </div>
  </div>
</template>

<script setup>
import i18n from '@/locales';

function changeLocale(value) {
  i18n.global.locale.value = value;
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/global.scss';
.wrraper__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ff9900;
  padding: 10px;
  @include font-format($size: 15px, $weight: bold, $color: #fff);
  margin-bottom: 20px;

  p {
    cursor: pointer;
  }

  button {
    @include font-format(
      $size: 10px,
      $weight: bold,
      $color: #ff9900,
      $margin: 0 5px
    );
    background: #fff;
    padding: 5px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
}
</style>
