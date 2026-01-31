const register_url = `${import.meta.env.VITE_API_URL}/api/user/register`;
const login__url=`${import.meta.env.VITE_API_URL}/api/user/login`;
import type { User,LoginUser } from "../types/index";


export default async function registerUser(user:User) {
  const res = await fetch(register_url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  if (res.status === 409) {
    throw new Error("USER_EXISTS");
  }

  if (!res.ok) {
    throw new Error("REGISTER_FAILED");
  }

  return res.json();
}

export  async function loginUser(user:LoginUser) {
  const res = await fetch(login__url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  if (res.status === 404) {
    throw new Error("USER_NOT_FOUND");
  }

  if (!res.ok) {
    throw new Error("LOGIN_FAILED");
  }

  return res.json();
}

