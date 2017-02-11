json.solution_labels @solution_labels.each do |solution_label|
  json.id solution_label.id
  json.created_at time_ago_in_words(solution_label.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + solution_label.created_at.strftime("%H:%M")
  
  json.title solution_label.title
  
  
end
json.count @count