class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :type, :username

  def type
    "user"
  end
end
