<script>
  export let brick;
  console.log('brick is ', brick);
  let wrapperClassList = ['w-full'];
  if (brick.visible) {
    wrapperClassList = [
      ...wrapperClassList,
      'border',
      'border-blue-300',
      'cursor-pointer',
    ];
  } else {
    wrapperClassList = [
      ...wrapperClassList,
      'invisible',
      'pointer-events-none',
    ];
  }
</script>

<style>

</style>

<span class={wrapperClassList.join(' ')} draggable="true">
  <img class="brick-image" src={brick.src} alt={brick.id} />
</span>
