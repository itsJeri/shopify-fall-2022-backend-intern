class Item < ApplicationRecord
  has_many :warehouse_items, dependent: :destroy
  has_many :warehouses, through: :warehouse_items
end
