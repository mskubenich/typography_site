class CreateClients < ActiveRecord::Migration[5.0]
  def change
    create_table :clients do |t|
      t.integer :logo_id
      t.string :title
      t.datetime :created_at
      t.datetime :updated_at
    end
    add_index :clients, :logo_id
  end
end
