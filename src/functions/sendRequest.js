import APIServer from '@/APIServer/APIServer';

const sendRequest = (methodName, data) => {
  const server = new APIServer();
  return server.request(methodName, data);
};

export default sendRequest;