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

<div class="flex justify-center mx-12 h-full">
  <div class="w-4/6 flex justify-center items-center">
    <div class="bg-white border-4 rounded-md border-blue-500">
      {#if $store.puzzleId}
        <div class="image-grid grid gap-0 grid-cols-4 p-6">
          {#each puzzleQuestion as brick}
            <PuzzleBrick bind:brick />
          {/each}
        </div>
      {:else}
        <div>Loading...</div>
      {/if}
    </div>
  </div>
  <div class="w-2/6">
    <h3>Info Section</h3>
  </div>
</div>
