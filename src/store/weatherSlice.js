import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    weatherHistory: []
}

export const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {
        insertCity: (state, action) => {
            const existingJson = state.weatherHistory.find((weather) => {
                return weather.Location === action.payload.Location;
            });
            if (!existingJson) {
                let updatedList = []
                updatedList.push(action.payload)
                state.weatherHistory.forEach((item)=>updatedList.push(item))
                state.weatherHistory = updatedList;
            }
        }
    }
})


// Action creators are generated for each case reducer function
export const { insertCity } = weatherSlice.actions

export default weatherSlice.reducer