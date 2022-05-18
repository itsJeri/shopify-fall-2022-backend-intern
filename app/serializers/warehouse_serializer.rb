class WarehouseSerializer < ActiveModel::Serializer
  attributes :id, :name, :street, :city, :country

  has_many :items
end
