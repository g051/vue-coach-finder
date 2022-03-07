import { createRouter, createWebHistory } from 'vue-router';

import CoachesList from './pages/coaches/CoachesList';
import NotFound from './pages/NotFound';
import store from './store';

const ContactCoach = () => import('./pages/requests/ContactCoach');
const CoachDetail = () => import('./pages/coaches/CoachDetail');
const CoachRegistration = () => import('./pages/coaches/CoachRegistration');
const RequestsReceived = () => import('./pages/requests/RequestsReceived');
const UserAuth = () => import('./pages/auth/UserAuth');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      component: CoachDetail,
      props: true,
      children: [
        { path: 'contact', component: ContactCoach }
      ]
    },
    { path: '/register', component: CoachRegistration, meta: { requireAuth: true } },
    { path: '/requests', component: RequestsReceived, meta: { requireAuth: true } },
    { path: '/auth', component: UserAuth, meta: { requireUnauth: true } },
    { path: '/:notFound(.*)', component: NotFound }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth && !store.getters.isAuthenticated)
    next('/auth');
  else if (to.meta.requireUnauth && store.getters.isAuthenticated)
    next('/coaches');
  else
    next();
});

export default router;
