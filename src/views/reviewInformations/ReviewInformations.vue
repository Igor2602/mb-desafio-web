<template>
  <div class="wrapper__content" v-if="!LOADING_STATE">
    <Form @submit="onSubmit" :validation-schema="schema" class="step__form">
      <p class="form__welcome--text">{{ t('reviewYourInformation') }}</p>

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
          {{ t('register') }}
        </button>
      </div>
    </Form>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useFormStore } from '@/stores/form/form.store';
import { useLoadingStore } from '@/stores/loading/loading.store';
import { useSnackbar } from 'vue3-snackbar';
import { home } from '@/services/index';
import TextField from '@/components/TextField.vue';
import { Form } from 'vee-validate';
import * as Yup from 'yup';
import { useI18n } from 'vue-i18n';

const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local',
});

const schema = Yup.object().shape({
  name: Yup.string().required(t('thisFieldIsRequired')),
  document: Yup.string().required(t('thisFieldIsRequired')),
  date: Yup.string().required(t('thisFieldIsRequired')),
  phone: Yup.string().required(t('thisFieldIsRequired')),
  password: Yup.string().required(t('thisFieldIsRequired')),
});

const { FORM_STATE } = storeToRefs(useFormStore());
const { LOADING_DISPATCH } = useLoadingStore();
const { LOADING_STATE } = storeToRefs(useLoadingStore());
const snackbar = useSnackbar();
const router = useRouter();

async function onSubmit() {
  console.log(FORM_STATE);
  const payload = FORM_STATE._object.FORM_STATE;
  LOADING_DISPATCH(true);
  await home.postHome(
    payload,
    (response) => {
      console.log(response.data, 'SUCCESS');
      snackbar.add({
        type: 'success',
        text: t('registrationSuccessfullyComplete'),
      });
    },
    (e) => {
      console.log(e, 'ERROR');
      snackbar.add({
        type: 'error',
        text: t('errorWhenRegistering'),
      });
    },
    () => {
      console.log('DONE');
      LOADING_DISPATCH(false);
    }
  );
}

function backStep() {
  router.push('/senha-acesso');
}
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/global.scss';
</style>
