import { PayloadAction, configureStore, createSlice } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { Mail } from '../mailData';
import { getAllMails } from './mails';

const mails = getAllMails();

const compareIndexes = (state: WritableDraft<Mail[]>, payloadID: number) => {
   const foundIndex = state.findIndex((mail) => mail.id === payloadID);
   return foundIndex >= 0 ? foundIndex : false;
};

const mailSlicer = createSlice({
   name: 'mail',
   initialState: mails,
   reducers: {
      markAsRead(state, action: PayloadAction<Mail>) {
         const index = compareIndexes(state, action.payload.id);
         index === false || (state[index].is_unread = false);
      },
      markAsUnread(state, action: PayloadAction<Mail>) {
         const index = compareIndexes(state, action.payload.id);
         index === false || (state[index].is_unread = false);
      },
      markAllAsRead(state) {
         for (const mail of state) {
            mail.is_unread = false;
         }
      },
      toggleRead(state, action: PayloadAction<Mail>) {
         const index = compareIndexes(state, action.payload.id);
         index === false || (state[index].is_unread = !state[index].is_unread);
      },
      search(state, action: PayloadAction<string>) {
         const query = action.payload;
         return query !== ''
            ? state.filter((m) => {
                 return new RegExp(`${query}`, 'i').test(
                    ` ${m.from} ${m.subject} ${m.snippet} `,
                 );
              })
            : mails;
      },
   },
});

export const { markAsRead, markAsUnread, markAllAsRead, toggleRead, search } =
   mailSlicer.actions;

export const store = configureStore({
   reducer: {
      mails: mailSlicer.reducer,
   },
});

type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
