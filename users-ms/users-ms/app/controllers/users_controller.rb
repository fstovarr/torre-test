class UsersController < ApplicationController
    skip_before_action :check_permissions, only: [:create]
  before_action :set_users, only: [:show]

  # GET /users
  def index
    @users = User.all
    render json: @users
  end

  # GET /users/1
  def show
    render json: @user
  end

  # POST /users
  def create
    @user = User.new user_params

    if @user.save
        tokens = JSONWebToken.encode payload: { id: @user.id, type: "user" }
        user = UserSerializer.new @user
        render json: {user: user, token: tokens}, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find_by username: params[:id]
    end

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.require(:user).permit(:email, :name, :username, :password, :password_confirmation)
    end
end
