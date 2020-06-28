import { Meteor } from 'meteor/meteor';
import App from '../imports/ui/App.svelte';
 
Meteor.startup(() => {
  navigator.serviceWorker.register('/sw.js').catch(error => {
    console.log('ServiceWorker registration failed: ', err)
  }); 

  new App({
    target: document.getElementById('app')
  });
});