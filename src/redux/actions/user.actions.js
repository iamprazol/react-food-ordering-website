import { userConstants } from "../constants";
import { userService } from "../services";
import { alertActions } from "./alert.actions";

export const userActions = {
  register,
};

function register(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.register(user).then(
      (user) => {
        dispatch(success(user));
        dispatch(
          alertActions.success({
            type: "success",
            title: "Registration Successful",
            description: "You have been successfully registered into the site.",
          })
        );
      },
      (error) => {
        dispatch(failure(error));
        dispatch(
          alertActions.error({
            type: "error",
            title: "Registration Failed",
            description: "Please try again or contact the site administrator.",
          })
        );
      }
    );
  };

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}
