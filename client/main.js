// Libs
import {Meteor} from 'meteor/meteor';
import Vue from 'vue';
import {RouterFactory, nativeScrollBehavior} from 'meteor/akryum:vue-router2';
import VueMeteorTracker from 'vue-meteor-tracker';

import '/imports/startup/both';

// App layout
import AppLayout from '/client/ui/AppLayout.vue';

// App start
Meteor.startup(() => {
  const router = new RouterFactory({
    mode: 'history',
    scrollBehavior: nativeScrollBehavior,
  }).create();

  Vue.use(VueMeteorTracker);

  new Vue({
    router,
    ...AppLayout,
  }).$mount('app');

  navigator.serviceWorker.register('/sw.js').then().catch(error => console.log('ServiceWorker registration failed: ', err));
});
