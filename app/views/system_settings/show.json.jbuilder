json.system_setting do
  json.id @system_setting.id
  json.created_at time_ago_in_words(@system_setting.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + @system_setting.created_at.strftime("%H:%M")
  json.address @system_setting.address
  json.phone_number @system_setting.phone_number
  json.site @system_setting.site
  json.email @system_setting.email
  json.created_at @system_setting.created_at
  json.updated_at @system_setting.updated_at
end