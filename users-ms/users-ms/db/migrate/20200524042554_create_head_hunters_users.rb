class CreateHeadHuntersUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :head_hunters_users do |t|
      t.integer :head_hunter_id, null: false
      t.integer :user_id, null: false
      t.integer :status, default: 0

      t.timestamps
    end

    add_index :head_hunters_users, [:user_id, :head_hunter_id], unique: true
  end
end
