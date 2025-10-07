import { configureStore } from "@reduxjs/toolkit";
import { saveData, LOCALSTORAGE_KEYS } from "@/utils";
import recipeForm from '@/features/recipeForm';


export const store = configureStore({
  reducer: {
    recipeForm: recipeForm
  }
})

store.subscribe(() => {
  const state = store.getState();

  // Object.values(LOCALSTORAGE_KEYS).forEach((key) => {
  //   saveData(key, state.appState[key]);
  // });

});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
