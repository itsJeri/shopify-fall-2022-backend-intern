class Item < ApplicationRecord
  # Ordered for error message handling
  validates :name, presence: true
  validates :description, presence: true

  belongs_to :warehouse
end
