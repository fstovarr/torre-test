module AppException
  extend ActiveSupport::Concern
  
  class InvalidToken < StandardError; end
  class InvalidRole < StandardError; end
  class AuthenticationError < StandardError; end
  class MissingToken < StandardError; end

  included do
    rescue_from ActiveRecord::RecordInvalid, with: :unprocessable
    rescue_from AppException::AuthenticationError, with: :unauthorized
    rescue_from ActiveRecord::RecordNotFound, with: :not_found
    rescue_from AppException::MissingToken, with: :missing_token
    rescue_from AppException::InvalidToken, with: :forbidden
    rescue_from AppException::InvalidRole, with: :forbidden
  end

  private

  def missing_token
    render json: { error: "Missing token" }, status: :unauthorized
  end

  def not_found(e)
    render json: { error: e.message || e || e }, status: :not_found
  end

  def forbidden(e)
    render json: { error: e.message || e }, status: :forbidden
  end

  def unprocessable(e)
    render json: { error: e.message || e }, status: :unprocessable_entity
  end

  def unauthorized(e)
    render json: { error: e.message || e }, status: :unauthorized
  end
end