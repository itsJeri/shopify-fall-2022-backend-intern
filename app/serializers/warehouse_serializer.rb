class WarehouseSerializer < ActiveModel::Serializer
  attributes :id, :name, :street, :city, :country, :items_count

  # # Maintain order if we ever want to show each warehouse's inventory
  # has_many :items do
  #   object.items.sort_by_oldest
  # end

  def items_count
    self.object.items.count
  end
end
