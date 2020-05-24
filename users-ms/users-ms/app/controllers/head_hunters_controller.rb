class HeadHuntersController < ApplicationController
  before_action :set_head_hunters, only: [:show]
  skip_before_action :check_permissions, only: [:create]

  # GET /head_hunters
  def index
    @head_hunters = HeadHunter.all
    render json: @head_hunters
  end

  # GET /head_hunters/1
  def show
    render json: @head_hunter
  end

  # POST /head_hunters
  def create
    @head_hunter = HeadHunter.new(head_hunter_params)

    if @head_hunter.save
        tokens = JSONWebToken.encode payload: { id: @head_hunter.id, type: "user" }
        hh = HeadHunterSerializer.new @head_hunter
        render json: {user: hh, token: tokens}, status: :created
    else
      render json: @head_hunter.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_head_hunter
      @head_hunter = HeadHunter.find_by username: params[:id]
    end

    # Only allow a trusted parameter "white list" through.
    def head_hunter_params
      params.require(:head_hunter).permit(:email, :name, :password, :password_confirmation)
    end
end
