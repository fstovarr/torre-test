class User < ApplicationRecord
    has_secure_password
    validates_presence_of :name, :email, :password_digest, :username
    validates :email, uniqueness: true
    validates :username, uniqueness: true

    has_many :head_hunters_users
    has_many :head_hunters, through: :head_hunters_users
end
