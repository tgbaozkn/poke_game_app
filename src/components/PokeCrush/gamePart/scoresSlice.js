import { createSlice } from "@reduxjs/toolkit";



const scoresSlice = createSlice({
    name : "playername",
    initialState : [{}],
    reducers: {
        addScore: (state, action)=>{
            const newScore = {
                name: action.payload.playername,
                score: action.payload.score
            }
            state.push(newScore);
        }
    }
});


export const { addScore } = scoresSlice.actions;

export default scoresSlice.reducer