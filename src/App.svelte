<script>
  import {Router, Route} from 'svelte-routing';
  import {Routes} from './Router.constants';
  import Playground from './Routes/Playground/Playground.svelte';
  import Header from './Components/Header/Header.svelte';
</script>

<style>

</style>

<Header />
<div class="app-wrapper">
  <Router>
    <Route path={Routes.play} component={Playground} />
    <Route path={Routes.home} component={Playground} />
  </Router>
</div>
