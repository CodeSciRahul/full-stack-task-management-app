import http from "./httpService";

interface loginSignupReq {
    username: string,
    password: string
}
export function userLogin(data:loginSignupReq){
    return http.post(`/login`, data)
}

export function userSignup(data:loginSignupReq){
    return http.post(`/register`,data);
}