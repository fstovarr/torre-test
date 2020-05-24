import axios from "axios";
import { URLS } from "../util/constants";

const Http = {
  offers: axios.create({
    baseURL: URLS.offers,
    timeout: 500,
  }),
  users: axios.create({
    baseURL: URLS.users,
    timeout: 500,
  }),
  torre: axios.create({ baseURL: URLS.torre, timeout: 3000 }),
  torreBios: axios.create({ baseURL: URLS.torreBios, timeout: 3000 }),
  torreSearch: axios.create({ baseURL: URLS.torreSearch, timeout: 3000 }),
};

export default Http;
