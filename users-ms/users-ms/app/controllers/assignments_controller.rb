class AssignmentsController < ApplicationController
    def request_head_hunter
        head_hunter_id = params.require :head_hunter_id
        puts @decoded_user.inspect

        raise AppException::InvalidRole if @decoded_user[:type] != "user" && @decoded_user[:type] != "company"

        hh = HeadHunter.find head_hunter_id
        raise ActiveRecord::RecordNotFound if hh.nil?

        if @decoded_user[:type] == "company"
            prev = CompaniesHeadHunter.where(company_id: @decoded_user[:id], head_hunter_id: head_hunter_id).last
            raise ActiveRecord::RecordInvalid if !prev.nil?

            company = Company.find @decoded_user[:id]    
            
            raise ActiveRecord::RecordNotFound if company.nil?
            company.head_hunters << hh
        else
            prev = HeadHuntersUser.where(user_id: @decoded_user[:id], head_hunter_id: head_hunter_id).last
            raise ActiveRecord::RecordInvalid if !prev.nil?

            user = User.find @decoded_user[:id]
            raise ActiveRecord::RecordNotFound if user.nil?
            user.head_hunters << hh
        end

        render json: {}, status: :ok
    end

    def confirm_head_hunter
        request = params.require(:assignment).permit(:user_type, :id)
        raise AppException::InvalidRole if @decoded_user[:type] != "headhunter"

        if request[:user_type] == "company"
            relationship = CompaniesHeadHunter.where(company_id: request[:id], head_hunter_id: @decoded_user[:id]).last
        elsif request[:user_type] == "user"
            relationship = HeadHuntersUser.where(user_id: request[:id], head_hunter_id: @decoded_user[:id]).last
        else
            raise ActiveRecord::RecordInvalid
        end

        raise ActiveRecord::RecordNotFound if relationship.nil?
        raise ActiveRecord::RecordInvalid if relationship.accepted?

        relationship.accept!

        render json: {}, status: :ok
    end
end
