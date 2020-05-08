const wait = (sec) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, sec);
  });
};

export default wait;