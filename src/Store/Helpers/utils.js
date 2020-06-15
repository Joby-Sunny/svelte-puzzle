export function setCurrentBrickPosition(puzzleQuestion) {
  return puzzleQuestion.map((brick, index) => {
    brick.currentPosition = index;
    return brick;
  });
}

export function getTotalMoves(currentTotal, moved) {
  return moved ? currentTotal + 1 : currentTotal;
}

export function updatePreviousState(state, moved) {
  if (moved === true) {
    const move = {
      puzzleQuestion: state.puzzleQuestion,
      id: state.totalMoves,
      time: new Date().toISOString(),
    };
    return limitRecentMovesListSize([move, ...state.recentMoves]);
  } else {
    return limitRecentMovesListSize(state.recentMoves);
  }
}

function limitRecentMovesListSize(recentMoves) {
  const START_INDEX = 0,
    LIMIT_INDEX = 8;
  return recentMoves.slice(START_INDEX, LIMIT_INDEX);
}
