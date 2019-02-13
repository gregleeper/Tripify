import axios from "axios";

export function login(email, password) {
  return axios.post("/api/auth", { email, password });
}

// export function googleLogin() {
//   return <a href="http://localhost:5005/api/auth/google" />;
// }

export function getJWT() {
  if (localStorage.getItem("token")) {
    return localStorage.getItem("token");
  } else {
    return document.cookie.valueOf("token").slice(6);
  }
}

export default {
  login,
  getJWT
};
