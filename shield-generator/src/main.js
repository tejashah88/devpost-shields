import Vue from 'vue';
import App from './App.vue';

import Field from 'buefy/dist/components/field';
import Input from 'buefy/dist/components/input';
import Notification from 'buefy/dist/components/notification';
import Tooltip from 'buefy/dist/components/tooltip';
import Checkbox from 'buefy/dist/components/checkbox';

import 'buefy/dist/buefy.css';
Vue.use(Field);         // b-field
Vue.use(Input);         // b-input
Vue.use(Notification);  // b-notification
Vue.use(Tooltip);       // b-tooltip
Vue.use(Checkbox);      // b-checkbox-button

import VueClipboard from 'vue-clipboard2';
Vue.use(VueClipboard);

Vue.config.productionTip = true;

new Vue({
  render: h => h(App),
}).$mount('#app');
