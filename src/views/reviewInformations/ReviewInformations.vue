<template>
  <div class="wrapper__content">
    <Form @submit="onSubmit" :validation-schema="schema" class="step__form">
      <p class="form__welcome--text">Revise suas informações</p>

      <TextField
        :label="FORM_STATE.documentType === 'PF' ? 'Nome' : 'Razão Social'"
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
          FORM_STATE.documentType === 'PF'
            ? 'Data de nascimento'
            : 'Data de abertura'
        "
        name="date"
        :type="'text'"
        :value="FORM_STATE.date"
        :mask="'##/##/####'"
      />

      <TextField
        :label="'Telefone'"
        name="phone"
        :type="'text'"
        :value="FORM_STATE.phone"
        :mask="'(##)#####-####'"
      />

      <TextField
        :label="'Sua senha'"
        name="password"
        :type="'password'"
        :value="FORM_STATE.password"
      />

      <div class="form__buttons--wrapper">
        <button class="form__btn--submit return" @click="backStep()">
          Voltar
        </button>
        <button type="submit" class="form__btn--submit">Coninuar</button>
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

const schema = Yup.object().shape({
  name: Yup.string().required(),
  document: Yup.string().required(),
  date: Yup.string().required(),
  phone: Yup.string().required(),
  password: Yup.string().required(),
});

const { FORM_STATE } = storeToRefs(useFormStore());
const { LOADING_DISPATCH } = useLoadingStore();
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
        text: 'Cadastro efetuado com sucesso!',
      });
    },
    (e) => {
      console.log(e, 'ERROR');
      snackbar.add({
        type: 'error',
        text: 'Erro ao realizar o cadastro',
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
