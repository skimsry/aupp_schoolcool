import { doSignUpClient } from "../../services";

export const signUpClient =
  (firstName, lastName, username, phoneNumber, email, password, type, status) =>
  (dispatch) =>
    doSignUpClient(
      firstName,
      lastName,
      username,
      phoneNumber,
      email,
      password,
      type,
      status
    )
      .then((user) => {
        dispatch({ type: "SIGNUP_SUCCESS", user });
        // history.push("/");
      })
      .catch(() => dispatch({ type: "SIGNUP_FAILURE" }));
