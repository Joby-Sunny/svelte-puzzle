<script>
  import {setPuzzle, store} from '../../Store';
  import PuzzleTotalMoves from '../PuzzleTotalMoves/PuzzleTotalMoves.svelte';
  import PuzzleMovesList from '../PuzzleMovesList/PuzzleMovesList.svelte';

  let puzzleTitle, puzzleImage;

  $: puzzleImage = $store.puzzleSource;
  $: puzzleTile = $store.puzzleImage;
  
</script>

<div class="puzzle-info__details">
  <img class="sourceImage" src={puzzleImage} alt={puzzleTile} />
  <PuzzleTotalMoves />
  <PuzzleMovesList />
</div>
