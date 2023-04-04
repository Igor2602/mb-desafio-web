import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/views/layout/Layout.vue'),
      meta: { requiresVisitor: true },
      children: [
        {
          path: '/senha-acesso',
          component: () => import('@/views/accessPassword/AccessPasswordd.vue'),
          meta: { requiresVisitor: true },
        },
        {
          path: '/dados-pessoais',
          component: () => import('@/views/personalData/PersonalData.vue'),
          meta: { requiresVisitor: true },
        },
        {
          path: '/revisao-informacoes',
          component: () =>
            import('@/views/reviewInformations/ReviewInformations.vue'),
          meta: { requiresVisitor: true },
        },
        {
          path: '',
          component: () => import('@/views/home/Home.vue'),
          meta: { requiresVisitor: true },
        },
      ],
    },

    {
      path: '/:catchAll(.*)*',
      component: () => import('@/views/notFound/ErrorNotFound.vue'),
      meta: { requiresAuth: true },
    },
  ],
});

export default router;
