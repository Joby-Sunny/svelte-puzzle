<script>
  import PuzzleBrick from '../../Components/PuzzleBrick/PuzzleBrick.svelte';
  import {setPuzzle, store} from '../../Store';
  setPuzzle();
  console.log('store is ', $store.puzzleId);
</script>

<style>

</style>

<div class="flex justify-center mx-12 h-full">
  <div class="w-4/6 flex justify-center items-center">
    <div class="bg-white border-4 rounded-md border-blue-500">
      <div class="image-grid grid gap-0 grid-cols-4 p-6">
        {#each $store.puzzleQuestion as brick}
          <PuzzleBrick {brick} />
        {/each}
      </div>
    </div>
  </div>
  <div class="w-2/6">
    <h3>Info Section</h3>
  </div>
</div>
