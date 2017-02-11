class CreateOrders < ActiveRecord::Migration[5.0]
  def change
    create_table :orders do |t|
      t.string :name
      t.string :phone_number
      t.string :email
      t.string :what_are_you_interested_in
      t.text :comment
      t.datetime :created_at
      t.datetime :updated_at
    end
  end
end
