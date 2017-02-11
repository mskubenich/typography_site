json.solution_label do
  json.id @solution_label.id
  json.created_at time_ago_in_words(@solution_label.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + @solution_label.created_at.strftime("%H:%M")
  json.title @solution_label.title
  json.created_at @solution_label.created_at
  json.updated_at @solution_label.updated_at
end