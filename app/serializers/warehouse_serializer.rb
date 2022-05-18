class WarehouseSerializer < ActiveModel::Serializer
  attributes :id, :name, :street, :state, :country
end
