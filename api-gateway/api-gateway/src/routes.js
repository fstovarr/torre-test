import { ValidateUserEmail } from "./controllers/users";

const routes = [
  {
    name: "/auth",
    children: [
      { name: "/validate/:id", type: "post", controller: ValidateUserEmail },
    ],
  },
];

function flattenRoutes(routes, parent = undefined) {
  let flatten = [];

  routes.forEach((item) => {
    if (item.controller) {
      const i = Object.assign(item);
      i.name = parent ? parent + item.name : item.name;
      flatten.push(i);
    }

    if (
      item.children &&
      Array.isArray(item.children) &&
      item.children.length > 0
    )
      flatten = [...flatten, ...flattenRoutes(item.children, item.name)];
  });

  return flatten;
}

export default flattenRoutes(routes);
