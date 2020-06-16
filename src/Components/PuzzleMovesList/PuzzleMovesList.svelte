<script>
  import {store} from '../../Store';
  import PuzzleMove from '../PuzzleMove/PuzzleMove.svelte';
  let recentMoves;
  $: recentMoves = $store.recentMoves;
</script>

<div class="previousMoves">
  <h5 class="previousMoves-title">Previous Moves</h5>
  <ul class="previousMoves-list">
    {#if recentMoves.length > 0}
      {#each recentMoves as move, key}
        <PuzzleMove {move} key={key + 1} />
      {/each}
    {:else}
      <li class="list-empty">No Moves Yet.</li>
    {/if}
  </ul>
</div>
