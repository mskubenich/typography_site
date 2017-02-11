class CreateGalleryItems < ActiveRecord::Migration[5.0]
  def change
    create_table :gallery_items do |t|
      t.integer :image_id
      t.text :description
      t.datetime :created_at
      t.datetime :updated_at
    end
    add_index :gallery_items, :image_id
  end
end
