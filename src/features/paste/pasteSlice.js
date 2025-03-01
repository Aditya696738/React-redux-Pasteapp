import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    pastes:localStorage.getItem('pastes')?JSON.parse(localStorage.getItem('pastes')):[]
}
export const pasteSlice = createSlice({
    name:'paste',
    initialState,
    reducers:{
        addPaste:(state , action)=>{
            const paste = action.payload;
            state.pastes.push(paste);
            localStorage.setItem('pastes' , JSON.stringify(state.pastes));
        },
        updatePaste:(state , action)=>{
            const paste = action.payload;
            const index = state.pastes.findIndex((item)=>item._id === paste._id)
            if(index >= 0){
                state.pastes[index] = paste;
                localStorage.setItem('pastes' , JSON.stringify(state.pastes));
            }
        },
        deletePaste:(state , action)=>{
            const pasteId = action.payload;
            const index = state.pastes.findIndex((item)=>item._id === pasteId);
            if(index >= 0){
                state.pastes.splice(index , 1);
                localStorage.setItem('pastes' , JSON.stringify(state.pastes))
            }

        },
        resetPaste:(state , action)=>{
            state.pastes = [];
            localStorage.removeItem('pastes');
        },
    }
})

export const {addPaste , updatePaste , deletePaste , resetPaste} = pasteSlice.actions;
export default pasteSlice.reducer;  