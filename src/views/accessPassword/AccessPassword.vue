<template>
  <div class="wrapper__content">
    <Form @submit="onSubmit" :validation-schema="schema" class="step__form">
      <p class="form__welcome--text">{{ t('accessPassword') }}</p>

      <TextField
        :label="t('yourPassword')"
        name="password"
        :type="'password'"
        :value="FORM_STATE.password"
      />

      <div class="form__buttons--wrapper">
        <button class="form__btn--submit return" @click="backStep()">
          {{ t('return') }}
        </button>
        <button type="submit" class="form__btn--submit">
          {{ t('continue') }}
        </button>
      </div>
    </Form>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useFormStore } from '@/stores/form/form.store';
import TextField from '@/components/TextField.vue';
import { Form } from 'vee-validate';
import * as Yup from 'yup';
import { useI18n } from 'vue-i18n';

const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local',
});

const schema = Yup.object().shape({
  password: Yup.string().required(t('thisFieldIsRequired')),
});

const { FORM_STATE } = storeToRefs(useFormStore());
const { FORM_DISPATCH } = useFormStore();

const router = useRouter();

function onSubmit(values) {
  FORM_DISPATCH({
    key: 'password',
    value: values.password,
  });

  router.push('/revisao-informacoes');
}

function backStep() {
  router.push('/dados-pessoais');
}
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/global.scss';
</style>
