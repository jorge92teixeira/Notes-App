/* eslint-disable no-console */
const clog = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params);
  }
};

module.exports = {
  clog,
};
