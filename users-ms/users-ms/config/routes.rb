Rails.application.routes.draw do
  post "/login", to: "authentication#login"
  delete "/logout", to: "authentication#logout"
  delete "/check-token", to: "authentication#validate_token"
  get "/validate", to: "authentication#validate_user"

  resources :users, only: [:create, :index, :show]
  resources :head_hunters, only: [:create, :index, :show]
  resources :companies, only: [:create, :index, :show]

  scope :assignment do
    post "/request", to: "assignments#request_head_hunter"
    put "/confirm", to: "assignments#confirm_head_hunter"
  end
end
