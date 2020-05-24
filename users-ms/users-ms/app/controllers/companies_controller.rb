class CompaniesController < ApplicationController
  before_action :set_companies, only: [:show]
  skip_before_action :check_permissions, only: [:create]

  # GET /companies
  def index
    @companies = Company.all
    render json: @companies
  end

  # GET /companies/1
  def show
    render json: @company
  end

  # POST /companies
  def create
    @company = Company.new(company_params)

    if @company.save
        tokens = JSONWebToken.encode payload: { id: @company.id, type: "user" }
        company = CompanySerializer.new @company
        render json: {user: company, token: tokens}, status: :created
    else
      render json: @company.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_company
      @company = Company.find_by username: params[:id]
    end

    # Only allow a trusted parameter "white list" through.
    def company_params
      params.require(:company).permit(:email, :name, :password, :password_confirmation)
    end
end
