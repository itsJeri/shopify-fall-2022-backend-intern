class WarehouseItemSerializer < ActiveModel::Serializer
  attributes :id, :warehouse_id, :item_id

  belongs_to :warehouse
  belongs_to :item
end
