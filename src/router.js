import VueRouter from 'vue-router';
import Home from './components/Home.vue';
import Editor from './components/Editor.vue';

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/home', component: Home },
    { path: '/editor', component: Editor }
  ]
});

export default router;
