import { login, register } from "./userService";

export const loginAction = (email, password) => async (dispatch) => {

    try {
        
        dispatch({type: "USER_PENDING"});

        // issue axios request to login API
        const response = await login(email, password)

        // save JWT inside localStorage
        window.localStorage.setItem('bookstore-token', response.data.token)

        // dispatch redux action
        dispatch({
            type: "USER_LOGIN",
            payload: response.data
        })
        
        dispatch({type: "USER_SUCCESS"});
    }

    catch {

        dispatch({type: "USER_ERROR"});

    }
}

export const registerAction = (user) => async (dispatch) => {

    try {

        dispatch({type: "USER_REGISTER_PENDING"})

        const response = register(user)

        dispatch({
            type: "USER_REGISTER",
            payload: {
                id: response.data,
                ...user,
            }
        })

        dispatch({type: "USER_REGISTER_SUCCESS"})
    }

    catch (error) {

        dispatch({type: "USER_REGISTER_ERROR"})
    }
}