class HeadHunterSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :type
  def type
    "head_hunter"
  end
end
