import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "USER_LOGIN_REQUEST",
    });
    const config = {
      headers: { "Content-type": "application/json" },
    };
    const { data } = await axios.post(
      "/api/users/login/",
      {
        username: email,
        password: password,
      },
      config
    );

    dispatch({ type: "USER_LOGIN_SUCCESS", payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    console.error("Login failed:", error.message);
    dispatch({ type: "USER_LOGIN_FAIL", payload: error.message });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({type:'USER_LOGOUT'})
};
