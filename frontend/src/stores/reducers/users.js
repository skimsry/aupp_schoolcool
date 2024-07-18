const users = (state = {}, action) => {
  switch (action.type) {
    case "SIGNIN_SUCCESS":
    case "SIGNUP_SUCCESS":
    case "INIT_SUCCESS":
      return {
        user: action.user,
      };
    case "INIT_FAILURE":
    case "SIGNUP_FAILURE":
    case "SIGNOUT_SUCCESS":
      return {};
    default: {
      return { ...state };
    }
  }
};

export default users;
