import { configureStore } from '@reduxjs/toolkit';

// Reducers
import { leaders } from './leaders/leadersReducer';
import { isModalEditLeadersOpen } from './modalEditLeaders/modalEditLeadersReducer';
import { isModalAddLeadersOpen } from './modalAddLeaders/modalAddLeadersReducer';

const store = configureStore({
	reducer: {
		leaders,
		isModalEditLeadersOpen,
		isModalAddLeadersOpen,
	},
	devTools: process.env.NODE_ENV === 'development',
});

export type StoreType = ReturnType<typeof store.getState>;

export default store;
