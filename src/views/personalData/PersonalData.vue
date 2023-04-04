<template>
  <div class="wrapper__content">
    <Form @submit="onSubmit" :validation-schema="schema" class="step__form">
      <p v-if="FORM_STATE.documentType === 'PF'" class="form__welcome--text">
        {{ t('physicalPerson') }}
      </p>
      <p v-else class="form__welcome--text">{{ t('legalPerson') }}</p>

      <TextField
        :label="
          FORM_STATE.documentType === 'PF' ? t('name') : t('corporateName')
        "
        name="name"
        :type="'text'"
        :value="FORM_STATE.name"
      />

      <TextField
        :label="FORM_STATE.documentType === 'PF' ? 'CPF' : 'CNPJ'"
        name="document"
        :type="'text'"
        :value="FORM_STATE.document"
        :mask="
          FORM_STATE.documentType === 'PF'
            ? '###.###.###-##'
            : '##.###.###/####-##'
        "
      />

      <TextField
        :label="
          FORM_STATE.documentType === 'PF' ? t('dateOfBirth') : t('openingDate')
        "
        name="date"
        :type="'text'"
        :value="FORM_STATE.date"
        :mask="'##/##/####'"
      />

      <TextField
        :label="t('telephone')"
        name="phone"
        :type="'text'"
        :value="FORM_STATE.phone"
        :mask="'(##)#####-####'"
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
import { useI18n } from 'vue-i18n';
import TextField from '@/components/TextField.vue';

import { Form } from 'vee-validate';
import * as Yup from 'yup';

const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local',
});

const schema = Yup.object().shape({
  name: Yup.string().required(t('thisFieldIsRequired')),
  document: Yup.string().required(t('thisFieldIsRequired')),
  date: Yup.string().required(t('thisFieldIsRequired')),
  phone: Yup.string().required(t('thisFieldIsRequired')),
});

const { FORM_STATE } = storeToRefs(useFormStore());
const { FORM_DISPATCH } = useFormStore();

const router = useRouter();

function onSubmit(values) {
  FORM_DISPATCH({
    key: 'name',
    value: values.name,
  });

  FORM_DISPATCH({
    key: 'document',
    value: values.document,
  });

  FORM_DISPATCH({
    key: 'date',
    value: values.date,
  });

  FORM_DISPATCH({
    key: 'phone',
    value: values.phone,
  });
  router.push('/senha-acesso');
}

function backStep() {
  router.push('/');
}
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/global.scss';
</style>
