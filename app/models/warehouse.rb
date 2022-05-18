class Warehouse < ApplicationRecord
  has_many :items

  validates :name, presence: true, uniqueness: true
  validates :street, presence: true
  validates :city, presence: true
  validates :country, presence: true
end
