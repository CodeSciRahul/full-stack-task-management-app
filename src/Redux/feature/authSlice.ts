//AuthSclie to store and reterive user Information and token in local Storage

import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface loginSignupRes {
    user: {
        username: string | null,
        id: string | null
    },
    token: string | null
}

const storedUser = localStorage.getItem('user');
const isaccess_token = localStorage.getItem('token');

const initialState: loginSignupRes = { 
user: storedUser ? JSON.parse(storedUser) : null,
token: isaccess_token ? JSON.parse(isaccess_token) : null,
};


export const authSlice = createSlice({
    initialState,
    name: 'auth',

    reducers: {
        setUserInfo: (state, action: PayloadAction<loginSignupRes>) => {
            const {token, user} = action.payload
            state.user = user
            state.token = token;
            

            //always store data in console in the format of stringify and reterive data in the format of object(parse)
            localStorage.setItem("token", JSON.stringify(token));
            localStorage.setItem("user", JSON.stringify(user));

        },

        removeUserInfo: (state) => {
            state.user = { username: null, id: null };
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }
    }
})

export const {setUserInfo,removeUserInfo } = authSlice.actions
export default authSlice.reducer;