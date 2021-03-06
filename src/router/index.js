import { createRouter, createWebHashHistory } from 'vue-router';

import PageHome from '@/pages/home';
import PageResults from '@/pages/results';

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
            path: '/results/',
            name: 'results',
            component: PageResults,
        },
    ]
});
