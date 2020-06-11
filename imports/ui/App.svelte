<script>
  import { Router as RouterImport } from 'svelte-router-spa'
  // HACK: https://github.com/jorgegorka/svelte-router/issues/15
  const Router = RouterImport.default
  import { routes } from '/imports/startup/client/routes.js'
</script>
 
<Router {routes} />