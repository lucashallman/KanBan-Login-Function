import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  try {
    console.log("User Info recievied by API - ", userInfo);
    const response = await fetch(`/auth/login`, {
      method: 'POST',
      body: JSON.stringify(userInfo),
      headers: {
        'Content-Type': 'application/json'
      }
      // body: JSON.stringify({username: 'JollyGuru', password:'asda'}),
    })

    const data = await response.json();
    return data;
  } catch (err) {
    console.log('Login Post Error:', err );
  }
}



export { login };
