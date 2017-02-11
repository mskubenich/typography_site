class CreateProductLabels < ActiveRecord::Migration[5.0]
  def change
    create_table :product_labels do |t|
      t.string :title
      t.datetime :created_at
      t.datetime :updated_at
    end
  end
end
