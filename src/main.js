
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'
import router from './router'
import {config} from './helpers/firebaseConfig'
import Vuetify from 'vuetify'

import "shitajicss/docs/css/shitaji.min.css";
import 'vuetify/dist/vuetify.css'
import "./scss/style.scss";

Vue.use(VueRouter)
Vue.use(Vuetify)

new Vue({
  router,
  created() {
    firebase.initializeApp(config); 
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      if(user) {
        this.$router.push('/editor') 
      } else {
        this.$router.push('/home')
      }
     });
    },
  el: '#app',
  render: h => h(App)
});
