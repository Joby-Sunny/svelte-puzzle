import {Reducer} from './Reducer';
import {SET_USER_PUZZLE, SET_BRICK_SELECTED} from './ActionTypes.contants';
import {PuzzleOne} from '../Data';

const withType = (type, payload) => ({type, payload});

export function setPuzzle() {
  Reducer.UpdateStore(withType(SET_USER_PUZZLE, {...PuzzleOne, hideItem: 12}));
}

export function selectBrick(id) {
  Reducer.UpdateStore(withType(SET_BRICK_SELECTED, {id}));
}
