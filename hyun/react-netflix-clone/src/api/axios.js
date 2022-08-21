import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params : {
        api_key:"f5deb829dbeba26813bf9d667a18cd03",
        language:"ko-KR"
    }
})

export default instance;