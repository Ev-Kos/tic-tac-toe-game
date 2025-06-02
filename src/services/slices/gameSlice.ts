import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

import type { RootState } from '../store';
import type { TGame, TMove } from '../../utils/types';

type TInitialState = {
  game: TMove[];
  games: TGame[];
};

const initialState: TInitialState = {
  game: [],
  games: [],
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGame: (state, action) => {
      state.game = [...state.game, action.payload];
    },
    saveGame: (state, action) => {
      const { result, players, boardSize, winner } = action.payload;
      const game = {
        id: nanoid(),
        date: new Date().toISOString(),
        moves: state.game,
        players,
        result,
        winner,
        boardSize,
      };
      state.games = [...state.games, game];
    },
    resetGame: (state) => {
      state.game = [];
    },
  },
});

export const { setGame, saveGame, resetGame } = gameSlice.actions;

export const gameState = (state: RootState) => state.game;

export default gameSlice.reducer;
