class CompanySerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :type

  def type
    "company"
  end
end
