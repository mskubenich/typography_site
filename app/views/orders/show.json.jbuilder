json.order do
  json.id @order.id
  json.created_at time_ago_in_words(@order.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + @order.created_at.strftime("%H:%M")
  json.name @order.name
  json.phone_number @order.phone_number
  json.email @order.email
  json.what_are_you_interested_in @order.what_are_you_interested_in
  json.comment @order.comment
  json.created_at @order.created_at
  json.updated_at @order.updated_at
end