json.product_labels @product_labels.each do |product_label|
  json.id product_label.id
  json.created_at time_ago_in_words(product_label.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + product_label.created_at.strftime("%H:%M")
  
  json.title product_label.title
  
  
end
json.count @count