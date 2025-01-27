import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUser } from '../../types/auth';

interface InitialState {
  user: IUser | null;
}

const initialState: InitialState = {
  user: null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    clearUserData: state => {
      state.user = initialState.user;
    },
  },
  selectors: {
    selectUser: state => state.user,
    selectIsLoggedIn: state => Boolean(state.user),
  },
});

export const { setUserData, clearUserData } = slice.actions;
export const { selectIsLoggedIn } = slice.selectors;

export default slice.reducer;
