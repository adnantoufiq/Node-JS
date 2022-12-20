const check_Error = (err, req, res, next) => {
  if (err) {
    return res.send(err?.message);
  } else {
    next();
  }
};

module.exports = {
  check_Error,
};
