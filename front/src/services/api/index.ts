import axios from "axios";
import { ApiMethod, PostMethod } from "./types";

function useApi() {
  const service = axios.create({
    baseURL: "http://localhost:3000",
  });

  const get = async ({ url, params }: ApiMethod) => {
    return await service.get(url, {
      params,
    });
  };

  const post = async ({ url, body, params }: PostMethod) => {
    return await service.post(url, body, {
      params,
    });
  };

  const postBuffer = async ({ url, body, params }: PostMethod) => {
    return await service.post(url, body, {
      params,
      responseType: "arraybuffer",
    });
  };

  return {
    get,
    post,
    postBuffer,
  };
}

export default useApi;
