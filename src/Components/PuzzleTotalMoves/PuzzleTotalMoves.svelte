<script>
  import {store} from '../../Store';
  let totalMoves;
  $: totalMoves = $store.totalMoves;
</script>

<div class="totalMoves">
  <span>Total Moves :</span>
  <span class="count">{totalMoves}</span>
</div>
