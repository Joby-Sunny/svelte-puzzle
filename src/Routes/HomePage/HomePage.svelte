<script>
  import RouterLink from '../../Components/RouterLink/RouterLink.svelte';
  import {Routes} from '../../Router.constants';
  const LogoImage = 'Images/logo.png';
</script>

<div class="homepage">
  <h4>Welcome</h4>
  <h6>To</h6>
  <h2>Svelte Puzzle</h2>
  <RouterLink path={Routes.playRoute}>Let's Play</RouterLink>
</div>
