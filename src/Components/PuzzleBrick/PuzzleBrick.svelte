<script>
  import {afterUpdate} from 'svelte';
  import {selectBrick, moveBrick} from '../../Store';
  export let brick;
  const KEY_CODES = {
    ENTER_KEY: 13,
    VALID: [37, 38, 39, 40],
    37: 'ARROW-LEFT',
    38: 'ARROW-UP',
    39: 'ARROW-RIGHT',
    40: 'ARROW-DOWN',
  };

  afterUpdate(() => {
    if (brick.selected === true) {
      document.querySelector('div.border-4.border-yellow-600').focus();
    }
  });

  function setWrapperClass(brick) {
    let wrapperClassList = ['w-full'];
    if (brick.visible === false) {
      wrapperClassList = [
        ...wrapperClassList,
        'invisible',
        'pointer-events-none',
      ];
    } else {
      wrapperClassList = [...wrapperClassList, 'cursor-pointer'];
    }
    if (brick.selected === true && brick.visible === true) {
      wrapperClassList = [...wrapperClassList, 'border-4', 'border-yellow-600'];
    }
    if (brick.selected === false && brick.visible === true) {
      wrapperClassList = [...wrapperClassList, 'border', 'border-blue-100'];
    }
    return wrapperClassList.join(' ');
  }

  function brickClick(event) {
    selectBrick(brick.id);
  }

  function brickTabIndex(brick) {
    if (brick.selected) {
      return 0;
    } else {
      return brick.currentPosition + 1;
    }
  }

  function brickMove(event) {
    event.preventDefault();
    if (KEY_CODES.VALID.includes(event.keyCode)) {
      moveBrick({direction: KEY_CODES[event.keyCode], id: brick.id});
    }
    if (KEY_CODES.ENTER_KEY === event.keyCode) {
      selectBrick(brick.id);
    }
  }
</script>

<style>

</style>

<div
  tabindex={brickTabIndex(brick)}
  class={setWrapperClass(brick)}
  draggable="false"
  on:keyup={brickMove}
  on:click={brickClick}>
  <img class="brick-image" src={brick.src} alt={brick.id} />
</div>
