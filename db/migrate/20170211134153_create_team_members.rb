class CreateTeamMembers < ActiveRecord::Migration[5.0]
  def change
    create_table :team_members do |t|
      t.integer :photo_id
      t.string :name
      t.string :position
      t.datetime :created_at
      t.datetime :updated_at
    end
    add_index :team_members, :photo_id
  end
end
