import http from "@/http"

const api = {
  login: "/users/login",
  userInfo: "/users/find",
  updatePassword: "/users/update/password",
  updateUserInfo: "/users/update/personal",
}

export const accountLoginRequest = (data) => {
  return http({
    method: "post",
    path: api.login,
    data,
    showSuccessMessage: false,
  })
}

export const requestUserInfoById = (id) => http({ method: 'get', path: `${api.userInfo}/${id}`, showSuccessMessage: false })

export const updateUserInfoRequest = (data) => http({ method: 'post', path: api.updateUserInfo, data })