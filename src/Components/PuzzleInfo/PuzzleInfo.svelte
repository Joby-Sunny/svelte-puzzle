<script>
  import {setPuzzle, store} from '../../Store';
  let puzzleTitle, puzzleImage;
  $: puzzleImage = $store.puzzleSource;
  $: puzzleTile = $store.puzzleImage;
</script>

<div class="puzzle-info">
  <h3>Information Section</h3>
  <img src={puzzleImage} alt={puzzleTile} />
</div>
