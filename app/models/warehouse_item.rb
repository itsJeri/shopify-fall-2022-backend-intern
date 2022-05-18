class WarehouseItem < ApplicationRecord
  belongs_to :warehouse
  belongs_to :item
end
