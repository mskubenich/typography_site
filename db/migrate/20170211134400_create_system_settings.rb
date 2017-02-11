class CreateSystemSettings < ActiveRecord::Migration[5.0]
  def change
    create_table :system_settings do |t|
      t.string :address
      t.string :phone_number
      t.string :site
      t.string :email
      t.datetime :created_at
      t.datetime :updated_at
    end
  end
end
