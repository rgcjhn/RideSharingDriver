function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const helpers = {
  timeout,
};

export default helpers;
