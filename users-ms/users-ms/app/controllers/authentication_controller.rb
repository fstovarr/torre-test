class AuthenticationController < ApplicationController
    skip_before_action :check_permissions, only: [:validate_user, :login]

    def validate_user
        username = params.require :username

        user = HeadHunter.find_by username: username
        user = User.find_by username: username if user.nil?
        user = Company.find_by username: username if user.nil?

        if !user.nil?
            render json: user 
        else
            render json: {}, status: :not_found
        end
    end

    def login
        user_params = params.require(:user).permit(:username, :type, :password, :email)

        case user_params[:type]
        when "user"
            user = User.find_by username: user_params[:username]
        when "headhunter"
            user = HeadHunter.find_by username: user_params[:username]
        when "company"
            user = Company.find_by username: user_params[:username]
        else
            user = nil
        end

        if user.nil?
            raise ActiveRecord::RecordNotFound, "User not found"
        elsif user.authenticate user_params[:password]
            tokens = JSONWebToken.encode payload: { id: user.id, type: user_params[:type] }
            render json: tokens
        else
            raise AppException::AuthenticationError, "Invalid password"
        end
    end

    def logout

    end

    private
    def http_auth_header
        return headers['Authorization'].split(' ').last if headers['Authorization'].present?
        raise(AppException::MissingToken, "Missing token")
    end
end
