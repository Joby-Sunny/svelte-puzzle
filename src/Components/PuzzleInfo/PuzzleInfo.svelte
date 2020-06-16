<script>
  import PuzzleDetails from '../PuzzleDetails/PuzzleDetails.svelte';
  import PuzzleComplete from '../PuzzleComplete/PuzzleComplete.svelte';
  import {setPuzzle, store} from '../../Store';

  let puzzleComplete;

  $: puzzleComplete = $store.puzzleComplete;
</script>

<div class="puzzle-info w-4/12">
  <h3 class="puzzle-info__title">Puzzle Details</h3>
  {#if puzzleComplete}
    <PuzzleComplete />
  {:else}
    <PuzzleDetails />
  {/if}
</div>
