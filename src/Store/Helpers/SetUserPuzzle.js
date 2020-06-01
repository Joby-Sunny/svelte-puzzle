import {setCurrentBrickPosition} from './utils';

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
