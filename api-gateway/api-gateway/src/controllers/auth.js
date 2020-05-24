import Http from "../../plugins/axios";

export const GetUsers = async function (req, res) {
  let response = await Http.users.get("/users");
  res.status(response.status).json(response.data);
};

export const ValidateUserEmail = async function (req, res) {
  let response = await Http.torreBios.get(`/${req.params.id}`, req.body);
  response = await Http.users.get(`/validate?username=${req.params.id}`);
  res.status(response.status).json(response.data.type);
};

export const CreateUser = async function (req, res) {
  let response = await Http.users.post(`/users`, req.body);
  res.status(response.status).json(response.data);
};

export const PerformLogin = async function (req, res) {
  let response = await Http.torreBios.get(`/${req.body.user.username}`);
  response = await Http.users.post("/login", req.body);
  res.status(response.status).json(response.data);
};

// export const ValidateUserEmail = async function (req, res) {
//   let response = await Http.torreBios.get(`/${req.params.id}`, req.body);
//   res.status(200).json(undefined);
// };
