export const SignInReducer = (state, action) =>{
    switch (action.type) {
        case 'SIGN_IN':
            return { ...state, userToken: action.payload };
        case 'SIGN_UP':
            return { ...state, userToken: null }
        case 'SIGN_OUT':
            return { ...state, userToken: null };
        default:
            return state;
    }
}
