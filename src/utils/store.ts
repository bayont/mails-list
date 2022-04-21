import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { mailsSlice } from './mailsSlice';

export const { markAsRead, markAsUnread, markAllAsRead, toggleRead, search } =
   mailsSlice.actions;

export const store = configureStore({
   reducer: {
      mails: mailsSlice.reducer,
   },
});

type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
