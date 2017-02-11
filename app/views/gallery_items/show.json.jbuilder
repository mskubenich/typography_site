json.gallery_item do
  json.id @gallery_item.id
  json.created_at time_ago_in_words(@gallery_item.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + @gallery_item.created_at.strftime("%H:%M")
  json.image do
    json.url @gallery_item.image_attachments.first.try(:file).try(:url)
    json.id @gallery_item.image_attachments.first.try(:id)
  end
  json.description @gallery_item.description
  json.created_at @gallery_item.created_at
  json.updated_at @gallery_item.updated_at
end