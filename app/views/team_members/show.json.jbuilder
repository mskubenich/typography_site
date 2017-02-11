json.team_member do
  json.id @team_member.id
  json.created_at time_ago_in_words(@team_member.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + @team_member.created_at.strftime("%H:%M")
  json.photo do
    json.url @team_member.photo_attachments.first.try(:file).try(:url)
    json.id @team_member.photo_attachments.first.try(:id)
  end
  json.name @team_member.name
  json.position @team_member.position
  json.created_at @team_member.created_at
  json.updated_at @team_member.updated_at
end