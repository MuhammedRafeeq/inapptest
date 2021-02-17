import Axios from "axios";
import { BASE_API, API_KEY } from "../config";

const instance = Axios.create();
instance.defaults.baseURL = BASE_API;
instance.defaults.params = {};

instance.interceptors.request.use(async (config) => {
  config.params['api-key'] = API_KEY;
  return config;
});

export default instance;
