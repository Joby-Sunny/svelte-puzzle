<script>
  import {setPuzzle, store} from '../../Store';
  let puzzleTitle, puzzleImage;
  $: puzzleImage = $store.puzzleSource;
  $: puzzleTile = $store.puzzleImage;
</script>

<div class="puzzle-info w-4/12">
  <h3 class="puzzle-info__title">Information Section</h3>
  <div class="puzzle-info__details">
    <img src={puzzleImage} alt={puzzleTile} />
  </div>
</div>
