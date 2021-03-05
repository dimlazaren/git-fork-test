import { createRouter, createWebHashHistory } from 'vue-router';

import PageHome from '@/pages/home';

const routerHistory = createWebHashHistory();

export default createRouter({
    history: routerHistory,
    routes: [
        {
            path: '/',
            component: PageHome,
        },
    ]
});
