<script>
  import {setPuzzle, store} from '../../Store';
  let puzzleTitle, puzzleImage;
  $: puzzleImage = $store.puzzleSource;
  $: puzzleTile = $store.puzzleImage;
  $: totalMoves = $store.totalMoves;
  $: recentMoves = $store.recentMoves;
</script>

<div class="puzzle-info w-4/12">
  <h3 class="puzzle-info__title">Information Section</h3>
  <div class="puzzle-info__details">
    <img src={puzzleImage} alt={puzzleTile} />
    <span>Total Moves: {totalMoves}</span>
    <ul class="previousMoves">
      {#each recentMoves as move, key}
        <li {key} class="previousMoves-item">
          {key + 1} {`Move No: ${move.id}`}
        </li>
      {/each}
    </ul>
  </div>
</div>
