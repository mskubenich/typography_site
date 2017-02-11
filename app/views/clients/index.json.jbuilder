json.clients @clients.each do |client|
  json.id client.id
  json.created_at time_ago_in_words(client.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + client.created_at.strftime("%H:%M")
  
  json.logo client.logo
  
  
  json.title client.title
  
  
end
json.count @count