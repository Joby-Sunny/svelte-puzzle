import {writable} from 'svelte/store';
import {
  SET_USER_PUZZLE,
  SET_BRICK_SELECTED,
  UPDATE_BRICK_POSITION,
  DROP_BRICK_POSTITION,
  UPDATE_PUZZLE_STATE,
} from './ActionTypes.contants';
import {
  setUserPuzzle,
  selectBrick,
  updateBrickPosition,
  dragDropBrick,
  updatePuzzleState,
} from './Helpers';

const INITIAL_STATE = {
  puzzleId: null,
  puzzleName: '',
  puzzleSource: '',
  puzzleQuestion: [],
  totalMoves: 0,
  recentMoves: [],
};

const {update, subscribe, set} = writable(INITIAL_STATE);

function UpdateStore(action) {
  update((state) => MainReducer(state, action));
}

export const Reducer = {UpdateStore, subscribe, set};

function MainReducer(state, action) {
  console.log(state);
  switch (action.type) {
    case SET_USER_PUZZLE:
      return setUserPuzzle(state, action.payload);
    case SET_BRICK_SELECTED:
      return selectBrick(state, action.payload);
    case UPDATE_BRICK_POSITION:
      return updateBrickPosition(state, action.payload);
    case DROP_BRICK_POSTITION:
      return dragDropBrick(state, action.payload);
    case UPDATE_PUZZLE_STATE:
      return updatePuzzleState(state, action.payload);
    default:
      return {...state};
  }
}
