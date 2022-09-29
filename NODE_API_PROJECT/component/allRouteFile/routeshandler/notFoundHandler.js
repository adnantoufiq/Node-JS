// module scaffholding
const handler = {};

handler.notFoundHandler = (requestProperties, callback) => {
  callback(404, {
    message: "your url is not available",
  });
};

module.exports = handler;
