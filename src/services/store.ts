import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { useDispatch, useSelector, useStore as useStoreBase } from 'react-redux';

import formsReducer from './slices/formSlice';
import gameReducer from './slices/gameSlice';

export const reducer = combineReducers({
  form: formsReducer,
  game: gameReducer,
});

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useStore: () => typeof store = useStoreBase;
