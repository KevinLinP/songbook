import SongsPage from '/imports/ui/SongsPage.svelte'
 
const routes = [
  {
    name: '/',
    component: SongsPage,
  },
  {
    name: '/s/:id',
    component: SongsPage,
  },
  // { # 😡
  //   name: '/:id',
  //   component: SongsPage,
  // },
]
 
export { routes }