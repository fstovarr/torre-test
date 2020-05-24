Rails.application.routes.draw do
  post "/login", to: "authentication#login"
  delete "/logout", to: "authentication#logout"
  get "/check-token", to: "authentication#validate_token"
  get "/validate", to: "authentication#validate_user"

  scope :users do
    get "/head_hunters", to: "users#head_hunters"
  end

  scope :companies do
    get "/head_hunters", to: "companies#head_hunters"
  end

  scope :head_hunters do
    get "/users", to: "head_hunters#users"
    get "/companies", to: "head_hunters#companies"
  end

  resources :users, only: [:create, :index, :show]
  resources :head_hunters, only: [:create, :index, :show]
  resources :companies, only: [:create, :index, :show]

  scope :assignment do
    post "/request", to: "assignments#request_head_hunter"
    put "/confirm", to: "assignments#confirm_head_hunter"
  end
end
