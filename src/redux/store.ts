import { configureStore } from "@reduxjs/toolkit";
// import { saveData, LOCALSTORAGE_KEYS } from "@/utils";
import recipeFormReducer from '@/features/recipeForm';
import filterReducer from '@/features/filters';


export const store = configureStore({
  reducer: {
    recipeForm: recipeFormReducer,
    filters: filterReducer
  }
})

// store.subscribe(() => {
//   const state = store.getState();

//   // Object.values(LOCALSTORAGE_KEYS).forEach((key) => {
//   //   saveData(key, state.appState[key]);
//   // });

// });


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
