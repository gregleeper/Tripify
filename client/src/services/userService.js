import axios from "axios";

export function register(user) {
  axios.post("/api/users", {
    name: user.name
  });
}
