class ApplicationController < ActionController::API
    include AppException
    before_action :check_permissions

    private
    def check_permissions
        header = request.headers['Authorization']
        jwt = header.split(' ').last if !header.blank?

        raise AppException::MissingToken if jwt.nil? || jwt.blank?
        
        @decoded_user = JSONWebToken.decode_access token: jwt
    end
end
