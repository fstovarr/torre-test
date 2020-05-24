class Company < ApplicationRecord
    has_secure_password
    validates_presence_of :name, :email, :password_digest, :username
    validates :email, uniqueness: true
    validates :username, uniqueness: true

    has_many :companies_head_hunters
    has_many :head_hunters, through: :companies_head_hunters
end
