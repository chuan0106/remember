import { defineConfig } from 'umi';

export default defineConfig({
    nodeModulesTransform: {
        type: 'none',
    },
    routes: [
        { path: '/', redirect: '/login' },  // 首页重定向
        {
            exact: true,
            path: '/lol',
            name: '英雄联盟商店',
            component: '@/layouts/LOL',
            routes: [
                { path: '/lol', name: '你的商店-英雄联盟官方网站-小川游戏', component: '@/pages/LOL' },
            ],
        },
        {
            exact: true,
            path: '/login',
            component: '@/layouts/Login',
            routes: [
                { path: '/login', name: '登陆页面', component: '@/pages/Login' },
            ],
        },
        {
            exact: true,
            path: '/categories',
            component: '@/layouts/Categories',
            routes: [
                { path: '/categories', name: '分类', component: '@/pages/Categories' },
            ],
        },
        {
            exact: true,
            path: '/Toolbar',
            routes: [
                { path: '/Toolbar', name: '分类', component: '@/component/Toolbar' },
            ],
        },
        {
            component: '@/pages/404',

        },
    ],
    // 修改icon
    // links: [
    //     // href的图片你可以放在public里面，直接./图片名.png 就可以了，也可以是cdn链接
    //     { rel: 'icon', href: 'https://www.dataojocloud.com/dataeye/v1/data/image/get?imageid=617a55a011001e6b8ea0cce3' },
    // ],
    fastRefresh: {},
    publicPath: './',  // 配置 publicPath ！！！
    // title: '首页',  // 修改title  
    title: false  // 如果需要自行通过 react-helmet 等方式渲染 title，配 title: false 可禁用内置的 title 渲染机制
});
