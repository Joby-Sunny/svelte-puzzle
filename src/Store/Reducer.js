import {writable} from 'svelte/store';
import {SET_USER_PUZZLE, SET_BRICK_SELECTED} from './ActionTypes.contants';
import {setUserPuzzle, selectBrick} from './Helper';

const INITIAL_STATE = {
  puzzleId: null,
  puzzleName: '',
  puzzleSource: '',
  puzzleQuestion: [],
};

const {update, subscribe} = writable(INITIAL_STATE);

function UpdateStore(action) {
  update((state) => {
    switch (action.type) {
      case SET_USER_PUZZLE:
        return setUserPuzzle(state, action.payload);
      case SET_BRICK_SELECTED:
        return selectBrick(state, action.payload);
      default:
        return state;
    }
  });
}

export const Reducer = {UpdateStore, subscribe};
