class CreateItems < ActiveRecord::Migration[7.0]
  def change
    create_table :items do |t|
      t.string :name
      t.string :description

      t.belongs_to :warehouse

      t.timestamps
    end
  end
end
