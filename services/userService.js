import api from "./api";

export const getUsers = async () => {
  return await api.get("/users/getall");
};

export const addUser = async (user) => {
  return await api.post("/users/add", user);
};

export const updateUser = async (user) => {
  return await api.post("/users/update", user);
};

export const deleteUser = async (user) => {
  return await api.post("/users/delete", user);
};
