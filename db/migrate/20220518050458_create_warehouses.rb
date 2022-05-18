class CreateWarehouses < ActiveRecord::Migration[7.0]
  def change
    # enable citext for case insensitive unique warehouse names
    enable_extension(:citext)
    create_table :warehouses do |t|
      t.citext :name
      t.index :name, unique: true
      t.string :street
      t.string :city
      t.string :country

      t.timestamps
    end
  end
end
