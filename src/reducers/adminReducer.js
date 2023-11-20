const initialState = {
    isAdmin: false,
}

const AdminReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ADMIN':
            return {
                isAdmin: action.payload,
            }

        default:
            return state;
    }
}

export default AdminReducer;