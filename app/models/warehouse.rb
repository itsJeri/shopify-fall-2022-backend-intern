class Warehouse < ApplicationRecord
  has_many :warehouse_items, dependent: :destroy
  has_many :items, through: :warehouse_items
end
