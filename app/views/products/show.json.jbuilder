json.product do
  json.id @product.id
  json.created_at time_ago_in_words(@product.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + @product.created_at.strftime("%H:%M")
  json.image do
    json.url @product.image_attachments.first.try(:file).try(:url)
    json.id @product.image_attachments.first.try(:id)
  end
  json.images @product.images_attachments.map{|a| { id: a.id, url: a.file.url }}
  json.title @product.title
  json.text @product.text
  json.offset_printing_price do
    json.url @product.offset_printing_price_attachments.first.try(:file).try(:url)
    json.id @product.offset_printing_price_attachments.first.try(:id)
  end
  json.digital_printing_price do
    json.url @product.digital_printing_price_attachments.first.try(:file).try(:url)
    json.id @product.digital_printing_price_attachments.first.try(:id)
  end
  json.created_at @product.created_at
  json.updated_at @product.updated_at
end