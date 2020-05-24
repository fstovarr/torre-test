class HeadHunterSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :type, :username
  def type
    "head_hunter"
  end
end
