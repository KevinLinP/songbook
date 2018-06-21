// Libs
import {Meteor} from 'meteor/meteor';
import Vue from 'vue';
import {RouterFactory, nativeScrollBehavior} from 'meteor/akryum:vue-router2';
import VueMeteorTracker from 'vue-meteor-tracker';

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
});
