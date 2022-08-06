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

export async function registerBoard(dataSubmit) {
  const request = await axios
    .post("/api/create", dataSubmit)
    .then((response) => response.data);

  return {
    type: "REGISTER_BOARD",
    payload: request,
  };
}

export function modifyBoard() {
  const request = axios.post("/api/modify").then((response) => response.data);

  return {
    type: "UPDATE_BOARD",
    payload: request,
  };
}

export function deleteBoard() {
  const request = axios.post("/api/delete").then((response) => response.data);

  return {
    type: "DELETE_BOARD",
    payload: request,
  };
}
