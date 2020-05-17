export function setUserPuzzle(state, payload) {
  return {
    ...state,
    puzzleId: payload.id,
    puzzleImage: payload.title,
    puzzleSource: payload.sourceImage,
    puzzleQuestion: setPayloadQuestion(payload),
  };
}

function setPayloadQuestion(payload) {
  return payload.imageFragments.map((image) => {
    let attrib = {visible: true, correct: false, selected: false};
    if (image.actualPosition === payload.hideItem) {
      attrib.visible = false;
    }
    return {...image, ...attrib};
  });
}

export function selectBrick(state, payload) {
  return {
    ...state,
    puzzleQuestion: setBrickSelected(state.puzzleQuestion, payload),
  };
}

function setBrickSelected(puzzleQuestion, payload) {
  return puzzleQuestion.map((image) => {
    if (image.id === payload.id) {
      image.selected = true;
    } else {
      image.selected = false;
    }
    return {...image};
  });
}
