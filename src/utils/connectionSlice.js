import { createSlice } from "@reduxjs/toolkit";

const ConnectionSlice = createSlice({
    name:"connections",
    initialState:[],
    reducers:{
        addConnections: (state,action) =>{
            return action.payload;
        },
        removeConnection:()=> [],
    },
});

export const {addConnections,removeConnection} = ConnectionSlice.actions;
export default ConnectionSlice.reducer;