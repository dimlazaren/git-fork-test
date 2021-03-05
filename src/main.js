import 'core-js/es/object/entries';

import { createApp } from 'vue';
import App from './App';

import './styles/main.less';

import blocks from './blocks';
import store from './store';
import router from './router';
import mixins from './mixins/global';
import ClickOutside from '@@/lib/click-outside';

window.addEventListener('DOMContentLoaded', () => {
    const app = createApp(App)
        .mixin(mixins)
        .use(store)
        .use(router)
        .directive('click-outside', ClickOutside);
    blocks.forEach((block) => {
        app.component(block.label, block.component);
    });
    app.mount('#app');
});
