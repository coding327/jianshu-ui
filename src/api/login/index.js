import http from "@/http"

const api = {
  login: "/users/login",
  updatePassword: "/users/update/password",
  userInfo: "/users/find"
}

export const accountLoginRequest = (data) => {
  return http({
    method: "post",
    path: api.login,
    data,
  })
}

export const requestUserInfoById = (id) => http({ method: 'get', path: `${api.userInfo}/${id}` })