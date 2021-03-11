import { createRouter, createWebHashHistory } from 'vue-router';

import PageHome from '@/pages/home';
import PageSearch from '@/pages/search';

const routerHistory = createWebHashHistory();

export default createRouter({
    history: routerHistory,
    routes: [
        {
            path: '/',
            name: 'home',
            component: PageHome,
        },
        {
            path: '/search/',
            name: 'search',
            component: PageSearch,
        },
    ]
});
