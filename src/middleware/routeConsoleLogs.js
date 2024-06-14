// loggingMiddleware.js
function routeLogger(message) {
  return function (req, res, next) {
    const userId = req.params.id;
    const logMessage = {
      userId: userId,
      message: message,
    };
    console.log(logMessage);
    next();
  };
}

export const logCartParam = routeLogger("Cart operation");
export const logOrdersParam = routeLogger("Order operation");
export const logOrderHistory = routeLogger("Order History operation");
