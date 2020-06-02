<script>
  import {onMount} from 'svelte';
  import PuzzleBrick from '../../Components/PuzzleBrick/PuzzleBrick.svelte';
  import {setPuzzle, store} from '../../Store';
  export let location;
  onMount(() => {
    setPuzzle();
  });
  let puzzleQuestion;
  $: puzzleQuestion = $store.puzzleQuestion;
</script>

<style>

</style>

<div class="playground">
  <div class="puzzle-question">
    <div class="puzzle-question__wrap">
      {#if $store.puzzleId}
        <div class="question-grid grid gap-0 grid-cols-4">
          {#each puzzleQuestion as brick}
            <PuzzleBrick bind:brick />
          {/each}
        </div>
      {:else}
        <div>Loading...</div>
      {/if}
    </div>
  </div>
  <div class="puzzle-info">
    <h3>Information Section</h3>
  </div>
</div>
