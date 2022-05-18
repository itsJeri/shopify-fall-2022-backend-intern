class Item < ApplicationRecord
  # Ordered for error message handling
  validates :name, presence: true
  validates :description, presence: true

  belongs_to :warehouse

  def self.sort_by_oldest
    self.order(:created_at)
  end
end
