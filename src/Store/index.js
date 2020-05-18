import {Reducer} from './Reducer';
export * from './Actions';
export const store = {subscribe: Reducer.subscribe, set: Reducer.set};
