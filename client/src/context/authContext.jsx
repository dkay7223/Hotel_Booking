import { LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS, LOGOUT } from "../constants/actionTypes";
import { createContext, useContext, useEffect, useReducer } from "react";

// Reducer Section... 

const AuthReducer = (state, { type, payload }) => {

    switch (type) {
        case LOGIN_START:
            return {
                user: null,
                loading: true,
                error: null,
            };
        case LOGIN_SUCCESS:
            return {
                user: payload,
                loading: false,
                error: null,
            };
        case LOGIN_FAILURE:
            return {
                user: null,
                loading: false,
                error: payload,
            };
        case LOGOUT:
            return {
                user: null,
                loading: false,
                error: null,
            };
        default:
            return state;
    }
};


// Context API Section...  

// default initial state
const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null,
};

// auth context create here...
export const AuthContext = createContext(INITIAL_STATE);

// this component use by wrapping at root ==> index.js for globally user data sharing...
export const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        // when user login successfully... 
        // store user info at localStorage for... 
        // after refreshing page, user data lose preventing... 
        // other needful context of use...
        localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user]);


    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                loading: state.loading,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);