import { configureStore, createAction, createReducer } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { Mail } from '../mailData';
import { getAllMails } from './mails';

export const markMailAsRead = createAction<Mail>('mails/markasread');
export const markMailAsUnread = createAction<Mail>('mails/markasunread');
export const markAllMailsAsRead = createAction('mails/markallasread');
export const sortMails = createAction('mails/sortmails');
export const setMails = createAction<Mail[]>('mails/set');
export const toggleIsRead = createAction<Mail>('mails/toggle');

export const mailDateComparer = (m1: Mail, m2: Mail) => {
   const date1 = new Date(m1.sent_date).getTime();
   const date2 = new Date(m2.sent_date).getTime();
   return date2 - date1;
};
const mails = getAllMails();

const compareIndexes = (state: WritableDraft<Mail[]>, payloadID: number) => {
   const foundIndex = state.findIndex((mail) => mail.id);
   return foundIndex > 0;
};

const mailReducer = createReducer(mails, (builder) => {
   builder
      .addCase(markMailAsRead, (state, action) => {
         const { id } = action.payload;
         const foundIndex = state.findIndex((mail) => mail.id === id);
         foundIndex > 0 && (state[foundIndex].is_unread = false);
      })
      .addCase(markMailAsUnread, (state, action) => {
         const { id } = action.payload;
         const foundIndex = state.findIndex((mail) => mail.id === id);
         foundIndex > 0 && (state[foundIndex].is_unread = true);
      })
      .addCase(markAllMailsAsRead, (state) => {
         for (const mail of state) {
            mail.is_unread = true;
         }
      })
      .addCase(toggleIsRead, (state, action) => {
         const { id } = action.payload;
         const foundIndex = state.findIndex((mail) => mail.id === id);
         foundIndex > 0 && (state[foundIndex].is_unread = true);
      })
      .addCase(setMails, (state, action) => {
         return action.payload;
      });
});

export const store = configureStore({
   reducer: {
      mails: mailReducer,
   },
});

type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
