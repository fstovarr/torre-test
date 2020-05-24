import {
  ValidateUserEmail,
  CreateUser,
  PerformLogin,
} from "./controllers/auth";

import {
  GetOffersByUser,
  GetOffersByHeadHunter,
  CreateOffer,
  ModifyOfferState,
  GetOffers,
} from "./controllers/offers";

import {
  GetHeadhuntersByUser,
  GetUsersByHeadhunter,
  GetCompaniesByHeadhunter,
  GetHeadhuntersByCompany,
  CreateHeadhunterRelation,
  ModifyHeadhunterRelation,
} from "./controllers/users";

const routes = [
  {
    name: "/auth",
    children: [
      { name: "/users/", type: "post", controller: CreateUser },
      { name: "/login", type: "post", controller: PerformLogin },
      { name: "/validate/:id", type: "get", controller: ValidateUserEmail },
    ],
  },
  {
    name: "/offers",
    children: [
      { name: "/", type: "post", controller: CreateOffer },
      { name: "/user", type: "get", controller: GetOffers },
      { name: "/user/:id", type: "get", controller: GetOffersByUser },
      { name: "/headhunter", type: "get", controller: GetOffersByHeadHunter },
      { name: "/:id", type: "put", controller: ModifyOfferState },
    ],
  },
  {
    name: "/headhunters",
    children: [
      { name: "/users", type: "get", controller: GetUsersByHeadhunter },
      { name: "/companies", type: "get", controller: GetCompaniesByHeadhunter },
      {
        name: "/associate",
        type: "post",
        controller: CreateHeadhunterRelation,
      },
      {
        name: "/modify",
        type: "put",
        controller: ModifyHeadhunterRelation,
      },
    ],
  },
  {
    name: "/users",
    children: [
      { name: "/headhunters", type: "get", controller: GetHeadhuntersByUser },
    ],
  },
  {
    name: "/companies",
    children: [
      {
        name: "/headhunters",
        type: "get",
        controller: GetHeadhuntersByCompany,
      },
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
