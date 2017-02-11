class CreateProducts < ActiveRecord::Migration[5.0]
  def change
    create_table :products do |t|
      t.integer :image_id
      t.string :title
      t.text :text
      t.integer :offset_printing_price_id
      t.integer :digital_printing_price_id
      t.datetime :created_at
      t.datetime :updated_at
    end
    add_index :products, :image_id
    add_index :products, :offset_printing_price_id
    add_index :products, :digital_printing_price_id
  end
end
