<script>
  import {onMount} from 'svelte';
  import PuzzleBrick from '../../Components/PuzzleBrick/PuzzleBrick.svelte';
  import PuzzleInfo from '../../Components/PuzzleInfo/PuzzleInfo.svelte';
  import {setPuzzle, store} from '../../Store';
  onMount(() => {
    setPuzzle();
  });
  let puzzleQuestion;
  $: puzzleQuestion = $store.puzzleQuestion;
</script>

<style>

</style>

<div class="playground">
  <div class="puzzle-question w-7/12">
    <div class="puzzle-question__wrap">
      {#if $store.puzzleId}
        <div class="question-grid grid gap-0 grid-cols-4">
          {#each puzzleQuestion as brick}
            <PuzzleBrick {brick} />
          {/each}
        </div>
      {:else}
        <div>Loading...</div>
      {/if}
    </div>
  </div>
  <PuzzleInfo />
</div>
