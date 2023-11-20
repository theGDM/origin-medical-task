const initialState = {
    loading: false,
    labels: [],
    error: '',
}

const LabelsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_LABELS_REQUEST':
            return {
                ...state,
                loading: true,
            };

        case 'FETCH_LABELS_SUCCESS':
            return {
                ...state,
                loading: false,
                labels: action.payload,
            };

        case 'FETCH_LABELS_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case 'SET_LABELS_DETAILS':
            return {
                ...state,
            }

        default:
            return state;
    }
}

export default LabelsReducer;