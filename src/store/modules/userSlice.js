const LOGIN = "userSlice/LOGIN";
const LOGOUT = "userSlice/LOGOUT";

export const userLogin = (id, token, nickname) => ({ type : LOGIN, id, token, nickname });
export const userLogout = () => ({ type : LOGOUT })


const initState = {
    id : null,
    isLogin : false,
    token : '',
    nickname : ''
};


export default function loginUserId(state = initState, action) {
    switch(action.type) {
        case LOGIN:
            return {
                ...state,
                id : action.id,
                isLogin : true,
                token : action.token,
                nickname : action.nickname
            };
        case LOGOUT:
            return {
                ...state,
                id : "",
                isLogin : false,
                token : "",
                nickname : ""
            }
        default:
            return state;    
    }
}

