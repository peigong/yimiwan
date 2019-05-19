'use strict';

module.exports = options => {
  return async function auth(ctx, next) {
    await next();
  };
};
