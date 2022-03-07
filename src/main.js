import { createApp, defineAsyncComponent } from 'vue';

import App from './App';
import router from './router';
import store from './store';
import BaseCard from './components/ui/BaseCard';
import BaseBadge from './components/ui/BaseBadge';
import BaseButton from './components/ui/BaseButton';
import BaseSpinner from './components/ui/BaseSpinner';
// import BaseDialog from './components/ui/BaseDialog';

const BaseDialog = defineAsyncComponent(() => import('./components/ui/BaseDialog'));

const app = createApp(App);

app.use(router);
app.use(store);

app.component('BaseBadge', BaseBadge);
app.component('BaseButton', BaseButton);
app.component('BaseCard', BaseCard);
app.component('BaseDialog', BaseDialog);
app.component('BaseSpinner', BaseSpinner);

app.mount('#app');
