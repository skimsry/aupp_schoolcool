const responseErrorHandler = (response) => {
  if (!response.ok) {
    throw response;
  }
  return response;
};

export const doSignUpClient = (
  firstName,
  lastName,
  username,
  phoneNumber,
  email,
  password,
  type,
  status = false
) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          username,
          phoneNumber,
          email,
          password,
          type,
          status,
        }),
      });
      const res = await responseErrorHandler(response);
      const data = res.json();
      const { token, user } = data;
      //   window.localStorage.setItem("blogChefJWTToken", token);
      //   window.localStorage.setItem("blogChefJWTUser", JSON.stringify(user));
      resolve(user);
    } catch (error) {
      error.json().then(({ error: error_1 }) => reject(error_1));
    }
  });
