import Axios from 'axios';
import { ConfigService } from '../config/config.service';

const resolveBaseUrl = () => {
  const {
    BE_SERVER: { PROTOCOL, HOST, PORT, GLOBAL_PREFIX },
  } = ConfigService.get();

  const baseURL = new URL(`${PROTOCOL}${HOST}`);
  baseURL.port = PORT.toString();
  baseURL.pathname = GLOBAL_PREFIX;
  return baseURL.toString();
};

const axios = Axios.create({ baseURL: resolveBaseUrl() });

export { axios };
