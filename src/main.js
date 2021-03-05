import 'core-js/es/object/entries';

import { createApp } from 'vue';
import App from './App';

import './styles/main.less';

import store from './store';
import router from './router';
import mixins from './mixins/global';
import ClickOutside from '@@/lib/click-outside';

window.addEventListener('DOMContentLoaded', () => {
    createApp(App)
        .mixin(mixins)
        .use(store)
        .use(router)
        .directive('click-outside', ClickOutside)
        .mount('#app');
});
