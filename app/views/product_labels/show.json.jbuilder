json.product_label do
  json.id @product_label.id
  json.created_at time_ago_in_words(@product_label.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + @product_label.created_at.strftime("%H:%M")
  json.title @product_label.title
  json.created_at @product_label.created_at
  json.updated_at @product_label.updated_at
end