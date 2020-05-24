class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :type

  def type
    "user"
  end
end
