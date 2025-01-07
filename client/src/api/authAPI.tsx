import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  try {
    const response = await fetch(`/auth-routes.ts`, {
      method: 'POST',
      body: (userInfo.password, userInfo.username),
    })

    const data = await response.json();
    return data;
  } catch (err) {
    console.log('Login Post Error');
  }
}



export { login };
