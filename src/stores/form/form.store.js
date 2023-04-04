import { defineStore } from 'pinia';

export const useFormStore = defineStore('form', {
  state: () => {
    return {
      FORM_STATE: {
        email: null,
        documentType: null,
        name: null,
        document: null,
        date: null,
        phone: null,
        password: null,
      },
    };
  },
  actions: {
    FORM_DISPATCH(payload) {
      this.FORM_STATE[payload.key] = payload.value;
    },
  },
});
