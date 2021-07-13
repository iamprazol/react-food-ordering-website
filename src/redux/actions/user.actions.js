import { userConstants } from "../constants";
import { userService } from "../services";

export const userActions = {
  register,
};

function register(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.register(user).then(
      (user) => {
        dispatch(success());
      },
      (error) => {
        dispatch(failure(error.toString()));
        console.log(error);
      }
    );
  };

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(user) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}
