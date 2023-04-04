import { createApp } from 'vue';
import App from './App.vue';
import router from './router/routes';
import { createPinia } from 'pinia';
import { SnackbarService, Vue3Snackbar } from 'vue3-snackbar';
import VueAxios from 'vue-axios';
import axios from 'axios';
import i18n from './locales';
import Maska from 'maska';

const pinia = createPinia();
const myApp = createApp(App);

router.beforeEach((to, from, next) => {
  const authVerificate = to.matched.some((record) => record.meta.requiresAuth);
  const visitorsVeficate = to.matched.some(
    (record) => record.meta.requiresVisitor
  );
  const loggedIn = localStorage.getItem('ACCESS_TOKEN');
  if (authVerificate) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!loggedIn) {
      window.location.replace(`${process.env.VITE__BASE_APP}login`);
    } else {
      next();
    }
  } else if (visitorsVeficate) {
    if (loggedIn) {
      window.location.replace('/');
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

myApp.use(SnackbarService);
myApp.component('vue3-snackbar', Vue3Snackbar);
myApp.use(Maska);
myApp.use(router);
myApp.use(pinia);
myApp.use(VueAxios, axios);
myApp.use(i18n);
myApp.mount('#app');
