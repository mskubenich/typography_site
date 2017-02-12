class AddImageToGalleryItems < ActiveRecord::Migration[5.0]
  def change
    add_attachment :gallery_items, :image
  end
end
