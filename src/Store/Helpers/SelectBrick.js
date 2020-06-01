export function selectBrick(state, payload) {
  return {
    ...state,
    puzzleQuestion: setBrickSelected(state.puzzleQuestion, payload),
  };
}

function setBrickSelected(puzzleQuestion, payload) {
  return puzzleQuestion.map((image) => {
    const update = {...image};
    if (update.id === payload.id) {
      update.selected = true;
    } else {
      update.selected = false;
    }
    return update;
  });
}
