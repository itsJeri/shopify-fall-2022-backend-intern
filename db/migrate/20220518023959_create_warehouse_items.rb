class CreateWarehouseItems < ActiveRecord::Migration[7.0]
  def change
    create_table :warehouse_items do |t|
      t.belongs_to :warehouse
      t.belongs_to :item

      t.timestamps
    end
  end
end
