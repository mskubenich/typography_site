json.team_members @team_members.each do |team_member|
  json.id team_member.id
  json.created_at time_ago_in_words(team_member.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + team_member.created_at.strftime("%H:%M")
  
  json.photo team_member.photo
  
  
  json.name team_member.name
  
  
  json.position team_member.position
  
  
end
json.count @count