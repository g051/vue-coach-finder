import { createApp } from 'vue';

import App from './App';
import router from './router';
import store from './store';
import BaseCard from './components/ui/BaseCard';
import BaseBadge from './components/ui/BaseBadge';
import BaseButton from './components/ui/BaseButton';

const app = createApp(App);

app.use(router);
app.use(store);

app.component('BaseBadge', BaseBadge);
app.component('BaseButton', BaseButton);
app.component('BaseCard', BaseCard);

app.mount('#app');
