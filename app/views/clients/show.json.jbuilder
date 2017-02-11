json.client do
  json.id @client.id
  json.created_at time_ago_in_words(@client.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + @client.created_at.strftime("%H:%M")
  json.logo do
    json.url @client.logo_attachments.first.try(:file).try(:url)
    json.id @client.logo_attachments.first.try(:id)
  end
  json.title @client.title
  json.created_at @client.created_at
  json.updated_at @client.updated_at
end