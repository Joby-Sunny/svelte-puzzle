import {
  setCurrentBrickPosition,
  getTotalMoves,
  updatePreviousState,
} from './utils';

export function updatePuzzleState(state, payload) {
  const puzzleQuestion = setCurrentBrickPosition(
    fetchPuzzleState(state.recentMoves, payload)
  );
  const totalMoves = getTotalMoves(state.totalMoves, true);
  const recentMoves = updatePreviousState(state, true);
  return {
    ...state,
    totalMoves,
    puzzleQuestion,
    recentMoves,
  };
}

function fetchPuzzleState(recentMoves, payload) {
  const {puzzleQuestion} = recentMoves.find(
    (move) => move.id === payload.moveId
  );
  return puzzleQuestion;
}
