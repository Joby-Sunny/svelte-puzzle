<script>
  import Router from 'svelte-spa-router';
  import {Routes} from './Router.constants';
  import Playground from './Routes/Playground/Playground.svelte';
  import HomePage from './Routes/HomePage/HomePage.svelte';
  import Header from './Components/Header/Header.svelte';
  const routes = {
    [Routes.play]: Playground,
    [Routes.home]: HomePage,
  };
</script>

<style>

</style>

<Header />
<div class="app-wrapper">
  <Router {routes} />
</div>
