json.products @products.each do |product|
  json.id product.id
  json.created_at time_ago_in_words(product.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + product.created_at.strftime("%H:%M")
  
  json.image product.image
  
  
  json.images product.images
  
  
  json.title product.title
  
  
  json.text product.text
  
  
  json.offset_printing_price product.offset_printing_price
  
  
  json.digital_printing_price product.digital_printing_price
  
  
end
json.count @count