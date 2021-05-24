import axios from "axios";

const instance = axios.create({
  baseURL: "https://us-central1-clone-dcbf0.cloudfunctions.net/api",
  // "http://localhost:5001/clone-dcbf0/us-central1/api", // The  Local API url
});

export default instance;
