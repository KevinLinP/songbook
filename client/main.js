// Libs
import {Meteor} from 'meteor/meteor';
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMeteorTracker from 'vue-meteor-tracker';

import ListPage from '/client/ui/ListPage.vue'
import LoginPage from '/client/ui/LoginPage.vue';
import NotFoundPage from '/client/ui/NotFoundPage.vue';

import '/imports/startup/both';

// App layout
import AppLayout from '/client/ui/AppLayout.vue';

// App start
Meteor.startup(() => {
  Vue.use(VueRouter);
  Vue.use(VueMeteorTracker);

  const router = new VueRouter({
    mode: 'history',
    routes: [
      {path: '/login', component: LoginPage},
      {path: '', component: ListPage},
      {path: '*', component: NotFoundPage}
    ]
  });

  new Vue({
    router,
    ...AppLayout,
  }).$mount('app');

  navigator.serviceWorker.register('/sw.js').then().catch(error => console.log('ServiceWorker registration failed: ', err));
});
