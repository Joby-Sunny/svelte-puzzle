<script>
  import RouterLink from '../RouterLink/RouterLink.svelte';
  const SuccessIcon = '/Images/success-icon.png';
</script>

<div class="puzzle-info__success">
  <h2>Hurray !</h2>
  <h6>You solved the puzzle.</h6>
  <RouterLink path={'/'}>
    <img src={SuccessIcon} alt="Puzzle completed Successfully" />
  </RouterLink>
</div>
