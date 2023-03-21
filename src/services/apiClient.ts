import axios, { CanceledError } from "axios";

export default axios.create({
  baseURL: "https://6418695875be53f451decdbe.mockapi.io/api",
});

export { CanceledError };
