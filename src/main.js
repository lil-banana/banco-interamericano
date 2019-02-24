import firebase from 'firebase';

import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'

Vue.config.productionTip = false

// Initialize Firebase
const config = {
  apiKey: "AIzaSyBqOkTzmRTtSozOLQ3O2Z9C7nFfy4TmRns",
  authDomain: "banco-interamericano.firebaseapp.com",
  databaseURL: "https://banco-interamericano.firebaseio.com",
  projectId: "banco-interamericano",
  storageBucket: "banco-interamericano.appspot.com",
  messagingSenderId: "783018323495"
};

firebase.initializeApp(config);


new Vue({
  render: h => h(App),
}).$mount('#app')