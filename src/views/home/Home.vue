<template>
  <div class="wrapper__home wrapper__content">
    <div>
      <Form @submit="onSubmit" class="step__form">
        <p class="form__welcome--text">{{ t('welcome') }}</p>

        <p class="form__input--text">{{ t('emailAddress') }}</p>
        <Field
          class="form__input"
          name="email"
          type="email"
          v-model="FORM_STATE.email"
          :rules="validateEmail"
        />
        <ErrorMessage name="email" class="form__input--error" />

        <div class="form__type--person--wrapper">
          <Field
            name="documentType"
            type="radio"
            value="PF"
            v-model="FORM_STATE.documentType"
            :rules="required"
          />
          {{ t('physicalPerson') }}

          <Field
            class="secundary--input"
            name="documentType"
            type="radio"
            value="PJ"
            v-model="FORM_STATE.documentType"
            :rules="required"
          />
          {{ t('legalPerson') }}
        </div>
        <ErrorMessage name="documentType" class="form__input--error" />

        <button class="form__btn--submit">
          {{ t('continue') }}
        </button>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useFormStore } from '@/stores/form/form.store';
import { useI18n } from 'vue-i18n';

import { Form, ErrorMessage, Field } from 'vee-validate';

const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local',
});

const { FORM_STATE } = storeToRefs(useFormStore());
const { FORM_DISPATCH } = useFormStore();

const router = useRouter();

function onSubmit(values) {
  FORM_DISPATCH({
    key: 'email',
    value: values.email,
  });
  router.push('/dados-pessoais');
}

function validateEmail(value) {
  if (!value) {
    return t('thisFieldIsRequired');
  }
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!regex.test(value)) {
    return t('thisIsNotValidEmailAddress');
  }
  return true;
}

function required(value) {
  if (value) {
    return true;
  }

  return t('thisFieldIsRequired');
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/global.scss';

.wrapper__home {
  .form__input--text {
    @include font-format($size: 12px, $margin: 20px 0 5px);
  }
  .form__input {
    width: 100%;
    height: 25px;
    border-radius: 5px;
    @include font-format();
  }

  .form__input--error {
    @include font-format($size: 12px, $margin: 0, $color: red);
  }
}
</style>
