import { configureStore } from '@reduxjs/toolkit'
import gameReducer from 'features/game/slice'

export default configureStore({
  reducer: {
    game: gameReducer,
  },
})
