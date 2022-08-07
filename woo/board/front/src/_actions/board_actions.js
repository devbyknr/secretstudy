import axios from "axios";
export async function loadList(dataSubmit) {
  const request = await axios
    .get("/api/list", dataSubmit)
    .then((response) => response.data);

  return {
    type: "BOARD_LIST",
    payload: request,
  };
}

export async function loadBoard(dataSubmit) {
  const request = await axios
    .post("/api/view", dataSubmit)
    .then((response) => response.data);

  return {
    type: "LOAD_BOARD",
    payload: request,
  };
}

export async function registerBoard(dataSubmit) {
  const request = await axios
    .post("/api/create", dataSubmit)
    .then((response) => response.data);

  return {
    type: "REGISTER_BOARD",
    payload: request,
  };
}

export async function modifyBoard(dataSubmit) {
  const request = await axios
    .post("/api/modify", dataSubmit)
    .then((response) => response.data);

  return {
    type: "UPDATE_BOARD",
    payload: request,
  };
}

export async function deleteBoard(dataSubmit) {
  const request = await axios
    .post("/api/delete", dataSubmit)
    .then((response) => response.data);

  return {
    type: "DELETE_BOARD",
    payload: request,
  };
}
