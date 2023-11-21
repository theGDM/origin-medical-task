const initialState = {
    sortArray: [],
}

const LabelsSortReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SORT_LABELS':
            return {
                sortArray: action.payload,
            }

        default:
            return state;
    }
}

export default LabelsSortReducer;