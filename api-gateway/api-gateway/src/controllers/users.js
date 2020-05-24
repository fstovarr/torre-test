import Http from "../../plugins/axios";

export const GetUsers = async function (req, res) {
  let response = await Http.users.get("/users");
  res.status(response.status).json(response.data);
};

export const GetHeadhuntersByUser = async function (req, res) {
  let response = await Http.users.get(`/users/head_hunters`, {
    headers: {
      authorization:
        req.headers["authorization"] || req.headers["Authorization"],
    },
  });

  res.status(response.status).json(response.data);
};

export const GetHeadhuntersByCompany = async function (req, res) {
  let response = await Http.users.get(`/companies/head_hunters`, {
    headers: {
      authorization:
        req.headers["authorization"] || req.headers["Authorization"],
    },
  });

  res.status(response.status).json(response.data);
};

export const GetCompaniesByHeadhunter = async function (req, res) {
  let response = await Http.users.get(`/head_hunters/companies`, {
    headers: {
      authorization:
        req.headers["authorization"] || req.headers["Authorization"],
    },
  });

  res.status(response.status).json(response.data);
};

export const GetUsersByHeadhunter = async function (req, res) {
  let response = await Http.users.get(`/head_hunters/users`, {
    headers: {
      authorization:
        req.headers["authorization"] || req.headers["Authorization"],
    },
  });

  res.status(response.status).json(response.data);
};

export const CreateHeadhunterRelation = async function (req, res) {
  let response = await Http.users.post(`/assignment/request`, req.body, {
    headers: {
      authorization:
        req.headers["authorization"] || req.headers["Authorization"],
    },
  });

  res.status(response.status).json(response.data);
};

export const ModifyHeadhunterRelation = async function (req, res) {
  let response = await Http.users.put(`/assignment/confirm`, req.body, {
    headers: {
      authorization:
        req.headers["authorization"] || req.headers["Authorization"],
    },
  });

  res.status(response.status).json(response.data);
};
