export default [
  {
    path: '/',
    name: 'list',
    component: '/client/ui/TheList.vue'
  },
  {
    path: '*',
    component: '/client/ui/NotFound.vue'
  }
];
