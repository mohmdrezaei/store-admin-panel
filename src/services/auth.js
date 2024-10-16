import api from "../configs/api";

const registerUser = async (username, password) => {
  try {
    const response = await api.post("auth/register", { username, password });
    return { response };
  } catch (error) {
    return { error };
  }
};

export { registerUser };
