// Libs
import {Meteor} from 'meteor/meteor';
import Vue from 'vue';
import {RouterFactory, nativeScrollBehavior} from 'meteor/akryum:vue-router2';

// App layout
import AppLayout from '/client/ui/AppLayout.vue';

// App start
Meteor.startup(() => {
  const router = new RouterFactory({
    mode: 'history',
    scrollBehavior: nativeScrollBehavior,
  }).create();

  new Vue({
    router,
    ...AppLayout,
  }).$mount('app');
});
