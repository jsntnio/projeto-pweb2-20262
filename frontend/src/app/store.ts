import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from '../features/auth/authSlice'
import { anunciosReducer } from '../features/anuncios/anunciosSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        anuncios: anunciosReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch