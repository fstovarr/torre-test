class JSONWebToken
  # Rails.application.credentials.secret_key_base  = Rails.application.credentials.Rails.application.credentials.secret_key_base _base 

  class << self
    def encode(payload:)
      exp = 2.hours.from_now

      payload[:exp] = exp.to_i
      payload[:_token_type] = "access"

      payload_ref = {}
      payload_ref[:exp] = 24.hours.from_now.to_i
      payload_ref[:_token_type] = "refresh"
      
      {access: JWT.encode(payload, Rails.application.credentials.secret_key_base ), refresh: JWT.encode(payload_ref, Rails.application.credentials.secret_key_base )}
    end

    def decode_access(token:)
      body = JWT.decode(token, Rails.application.credentials.secret_key_base )[0]
      decoded = HashWithIndifferentAccess.new body
      raise JWT::InvalidPayload if decoded[:_token_type] != "access"
      decoded
    rescue JWT::InvalidPayload => e
      raise AppException::InvalidToken, "Invalid payload"
    rescue JWT::DecodeError => e
      raise AppException::InvalidToken, e.message
    end

    def decode_refresh(token:)
      body = JWT.decode(token, Rails.application.credentials.secret_key_base )[0]
      decoded = HashWithIndifferentAccess.new body
      raise JWT::InvalidPayload if decoded[:_token_type] != "refresh"
      decoded
    rescue JWT::InvalidPayload => e
      raise AppException::InvalidToken, "Invalid payload"
    rescue JWT::DecodeError => e
      raise AppException::InvalidToken, e.message
    end
  end
end