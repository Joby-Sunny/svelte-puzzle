<script>
  import {afterUpdate} from 'svelte';
  import {selectBrick, moveBrick, dragDropBrick} from '../../Store';
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
      document.querySelector('div.brick-visible.brick-selected').focus();
    }
  });

  function setWrapperClass(brick) {
    let wrapperClassList = [];
    if (brick.visible === false) {
      wrapperClassList = [...wrapperClassList, 'brick-hidden'];
    } else {
      wrapperClassList = [...wrapperClassList, 'brick-visible'];
    }
    if (brick.selected === true && brick.visible === true) {
      wrapperClassList = [...wrapperClassList, 'brick-selected'];
    }
    if (brick.selected === false && brick.visible === true) {
      wrapperClassList = [...wrapperClassList, 'brick-normal'];
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

  function onDragStart(event) {
    event.dataTransfer.setData('id', brick.id);
  }

  function onDragOver(event) {
    event.preventDefault();
  }

  function onDrop(event) {
    event.preventDefault();
    dragDropBrick({id: event.dataTransfer.getData('id')});
  }
</script>

<style>

</style>

{#if brick.visible === true}
  <div
    tabindex="0"
    class={setWrapperClass(brick)}
    draggable="true"
    on:dragstart={onDragStart}
    on:keyup={brickMove}
    on:click={brickClick}>
    <img class="brick-image" src={brick.src} alt={brick.id} />
  </div>
{:else}
  <div
    class={setWrapperClass(brick)}
    draggable="false"
    on:dragover={onDragOver}
    on:drop={onDrop} />
{/if}
