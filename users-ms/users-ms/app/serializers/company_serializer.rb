class CompanySerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :type, :username

  def type
    "company"
  end
end
