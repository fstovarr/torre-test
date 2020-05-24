const processRequest = (fn, req, res, next, public_route = false) => {
  Promise.resolve(fn(req, res, next)).catch(async function (error) {
    if (error.response !== undefined && error.response.status !== undefined) {
      if (process.env.NODE_ENV !== "production")
        res.status(error.response.status).json({ error: error.response.data });
      else res.status(error.response.status).json(undefined);
    } else {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });
};

const errorHandler = (fn) => (req, res, next) => {
  processRequest(fn, req, res, function (err) {
    if (err !== undefined) res.status(500).json({ error: `${err}` });
    processRequest(fn, req, res, next, public_route);
  });
};

export const generateRoutes = function (api, routes) {
  for (let route of routes) {
    api[route.type](route.name, errorHandler(route.controller));
  }
  return api;
};
