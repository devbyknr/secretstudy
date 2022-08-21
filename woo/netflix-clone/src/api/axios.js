import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "473e8c61293b31c736f04c10b531c48f",
    language: "ko-KR",
  },
});

export default instance;
