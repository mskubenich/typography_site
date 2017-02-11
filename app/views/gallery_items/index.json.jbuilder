json.gallery_items @gallery_items.each do |gallery_item|
  json.id gallery_item.id
  json.created_at time_ago_in_words(gallery_item.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + gallery_item.created_at.strftime("%H:%M")
  
  json.image gallery_item.image
  
  
  json.description gallery_item.description
  
  
end
json.count @count