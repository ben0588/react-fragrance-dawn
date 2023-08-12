import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        isSearch: false,
        searchText: '',
    },
    reducers: {
        changeSearch(state, action) {
            state.isSearch = action.payload.isSearch;
            state.searchText = action.payload.searchText;
        },
        removeSearch(state, action) {
            return {
                isSearch: false,
                searchText: '',
            };
        },
    },
});

export const { changeSearch, removeSearch } = searchSlice.actions;

export default searchSlice.reducer;
