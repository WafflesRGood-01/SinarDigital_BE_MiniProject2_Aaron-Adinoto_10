export function success(res, message, data = null) {
  return res.json({
    status: "success",
    message,
    data
  });
}

export function error(res, message, code = 400) {
  return res.status(code).json({
    status: "error",
    message
  });
}