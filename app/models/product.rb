class Product < ActiveRecord::Base

  attr_accessor :image

  def image_attachments
    Attachment.where entity_id: self.id, entity_type: 'product_image'
  end
  attr_accessor :images

  def images_attachments
    Attachment.where entity_id: self.id, entity_type: 'product_images'
  end
  def text_attachments
    Attachment.where entity_id: self.id, entity_type: 'product_text'
  end
  attr_accessor :offset_printing_price

  def offset_printing_price_attachments
    Attachment.where entity_id: self.id, entity_type: 'product_offset_printing_price'
  end
  attr_accessor :digital_printing_price

  def digital_printing_price_attachments
    Attachment.where entity_id: self.id, entity_type: 'product_digital_printing_price'
  end

  after_destroy :destroy_attachments
  after_save :update_attachments

  private


  def destroy_attachments
    image_attachments.destroy_all
    images_attachments.destroy_all
    text_attachments.destroy_all
    offset_printing_price_attachments.destroy_all
    digital_printing_price_attachments.destroy_all
  end

  def update_attachments
    update_image_attachments
    update_images_attachments
    update_text_attachments
    update_offset_printing_price_attachments
    update_digital_printing_price_attachments
  end

  def update_text_attachments
    Attachment.where('created_at <= :day_ago AND entity_id IS NULL', :day_ago  => 1.day.ago ).destroy_all

    Attachment.where(entity_id: nil, entity_type: "product_text").each do |attachment|
        if text.include? attachment.file.url
            attachment.update_attribute :entity_id, id
        end
    end
  end

  def update_images_attachments
    self.images ||= []
    self.images.each do |attachment|
      if attachment[:id]
          Attachment.find_by_id_and_entity_type(attachment[:id], 'product_images').destroy if attachment[:removed] == true || attachment[:removed] == 'true'
      else
        Attachment.create file: attachment[:file], entity_type: 'product_images', entity_id: self.id
      end
    end
  end

  def update_image_attachments
    self.image ||= {}
    if self.image[:id]
      Attachment.find_by_id_and_entity_type(self.image[:id], 'product_image').destroy if self.image[:removed] == true || self.image[:removed] == 'true'
    elsif self.image[:file]
      Attachment.create file: self.image[:file], entity_type: 'product_image', entity_id: self.id
    end
    end

  def update_offset_printing_price_attachments
    self.offset_printing_price ||= {}
    if self.offset_printing_price[:id]
      Attachment.find_by_id_and_entity_type(self.offset_printing_price[:id], 'product_offset_printing_price').destroy if self.offset_printing_price[:removed] == true || self.offset_printing_price[:removed] == 'true'
    elsif self.offset_printing_price[:file]
      Attachment.create file: self.offset_printing_price[:file], entity_type: 'product_offset_printing_price', entity_id: self.id
    end
    end

  def update_digital_printing_price_attachments
    self.digital_printing_price ||= {}
    if self.digital_printing_price[:id]
      Attachment.find_by_id_and_entity_type(self.digital_printing_price[:id], 'product_digital_printing_price').destroy if self.digital_printing_price[:removed] == true || self.digital_printing_price[:removed] == 'true'
    elsif self.digital_printing_price[:file]
      Attachment.create file: self.digital_printing_price[:file], entity_type: 'product_digital_printing_price', entity_id: self.id
    end
    end
end
