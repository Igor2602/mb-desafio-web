<template>
  <div class="wrapper__home wrapper__content">
    <div>
      <Form @submit="onSubmit" :validation-schema="schema" class="step__form">
        <p class="form__welcome--text">{{ t('welcome') }}</p>

        <TextField
          :label="t('emailAddress')"
          name="email"
          :type="'email'"
          :value="FORM_STATE.email"
        />

        <div class="form__type--person--wrapper">
          <input
            name="documentType"
            type="radio"
            value="PF"
            v-model="FORM_STATE.documentType"
          />
          {{ t('physicalPerson') }}
          <input
            class="secundary--input"
            name="documentType"
            type="radio"
            value="PJ"
            v-model="FORM_STATE.documentType"
          />
          {{ t('legalPerson') }}
        </div>
        <span>{{ errorMessage }}</span>
        <button type="submit" class="form__btn--submit">
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
import TextField from '@/components/TextField.vue';

import { Form } from 'vee-validate';
import * as Yup from 'yup';

const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local',
});

const schema = Yup.object().shape({
  email: Yup.string()
    .email(t('thisIsNotValidEmailAddress'))
    .required(t('thisFieldIsRequired')),
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
</script>

<style lang="scss" scoped>
@import '@/assets/scss/global.scss';
</style>
