json.gallery_items @gallery_items.each do |i|
  json.id i.id
  json.image i.image.url
end