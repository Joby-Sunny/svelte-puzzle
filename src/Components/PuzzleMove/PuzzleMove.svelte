<script>
  import {updatePuzzleState} from '../../Store';
  import {Time} from '../../Utils';

  export let move;
  export let key;

  function updatePuzzle(event) {
    event.preventDefault();
    updatePuzzleState({moveId: move.id});
  }
</script>

<li {key} class="list-item" on:click={updatePuzzle}>
  <span class="list-item__index">{key}</span>
  <span class="list-item__title">Go To Move {move.id + 1}</span>
  <span class="list-item__time">{Time.formatTime(move.time)}</span>
</li>
