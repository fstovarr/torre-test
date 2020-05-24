import Http from "../../plugins/axios";

export const GetOffers = async function (req, res) {
  let response = await Http.users.get("/check-token", {
    headers: {
      authorization:
        req.headers["authorization"] || req.headers["Authorization"],
    },
  });

  response = await Http.offers.get(`/offers/user/${response.data.id}`);
  res.status(response.status).json(response.data);
};

export const GetOffersByUser = async function (req, res) {
  let response = await Http.users.get("/check-token", {
    headers: {
      authorization:
        req.headers["authorization"] || req.headers["Authorization"],
    },
  });
  response = await Http.offers.get(`/offers/user/${req.params.id}`);
  res.status(response.status).json(response.data);
};

export const GetOffersByHeadHunter = async function (req, res) {
  let response = await Http.users.get("/check-token", {
    headers: {
      authorization:
        req.headers["authorization"] || req.headers["Authorization"],
    },
  });
  response = await Http.offers.get(`/offers/headhunter/${response.id}`);
  res.status(response.status).json(response.data);
};

export const CreateOffer = async function (req, res) {
  let response = await Http.users.get("/check-token", {
    headers: {
      authorization:
        req.headers["authorization"] || req.headers["Authorization"],
    },
  });

  if (response.type !== "company") {
    res.status(403).json(undefined);
    return;
  }

  response = await Http.torre.get(`/${req.body.id}`);

  response = await Http.offers.post(`/offers/`, {
    company_id: req.body.id,
    objective: response.data.objective,
  });

  res.status(response.status).json(response.data);
};

export const ModifyOfferState = async function (req, res) {
  let response = await Http.users.get("/check-token", {
    headers: {
      authorization:
        req.headers["authorization"] || req.headers["Authorization"],
    },
  });

  response = await Http.offers.put(`/offers/${req.params.id}`, req.body);
  res.status(response.status).json(response.data);
};
