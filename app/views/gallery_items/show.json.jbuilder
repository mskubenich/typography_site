json.gallery_item do
  json.id @gallery_item.id
  json.image do
    json.url @gallery_item.image.url(:small)
  end
  json.description @gallery_item.description
end