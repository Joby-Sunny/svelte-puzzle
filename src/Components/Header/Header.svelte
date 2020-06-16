<script>
  import RouterLink from '../RouterLink/RouterLink.svelte';
  import {Routes} from '../../Router.constants';
</script>

<header class="app-header">
  <RouterLink path={Routes.home}>
    <h2 class="app-header__title">Svelte Puzzle</h2>
  </RouterLink>
</header>
