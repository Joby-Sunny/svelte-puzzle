export function setUserPuzzle(state, payload) {
  return {
    ...state,
    puzzleId: payload.id,
    puzzleImage: payload.title,
    puzzleSource: payload.sourceImage,
    puzzleQuestion: setCurrentBrickPosition(
      shuffleBricks(setPayloadQuestion(payload))
    ),
  };
}

function setPayloadQuestion(payload) {
  return payload.imageFragments.map((image, index) => {
    let attrib = {
      visible: true,
      correct: false,
      selected: false,
      currentPosition: index,
    };
    if (image.actualPosition === payload.hideItem) {
      attrib.visible = false;
    }
    return {...image, ...attrib};
  });
}

function shuffleBricks(puzzleQuestion) {
  let current = puzzleQuestion.length;
  while (current > 0) {
    let toIndex = Math.floor(Math.random() * current);
    let temp = {};
    current -= 1;
    temp = puzzleQuestion[toIndex];
    puzzleQuestion[toIndex] = puzzleQuestion[current];
    puzzleQuestion[current] = temp;
  }
  return puzzleQuestion;
}

function setCurrentBrickPosition(puzzleQuestion) {
  return puzzleQuestion.map((brick, index) => {
    brick.currentPosition = index;
    return brick;
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
    const update = {...image};
    if (update.id === payload.id) {
      update.selected = true;
    } else {
      update.selected = false;
    }
    return update;
  });
}
