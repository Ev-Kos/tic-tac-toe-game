import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store';
import { MIN_BOARD_SIZE } from '../../utils/constants';

type TFormState = {
  firstPlayer: string;
  secondPlayer: string;
  isBot: boolean;
  boardSize: number;
};

type TInitialState = {
  form: TFormState;
};

const initialState: TInitialState = {
  form: {
    firstPlayer: '',
    secondPlayer: '',
    isBot: false,
    boardSize: MIN_BOARD_SIZE,
  },
};

type TSetFormPayload = {
  field: keyof TFormState;
  value: TFormState[keyof TFormState];
};

export const formsSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setForm: (state, action: PayloadAction<TSetFormPayload>) => {
      const { field, value } = action.payload;
      state.form[field] = value as never;
    },
    resetForm: () => initialState,
  },
});

export const { setForm, resetForm } = formsSlice.actions;

export const form = (state: RootState) => state.form.form;

export default formsSlice.reducer;
