class CreateHeadHunters < ActiveRecord::Migration[5.2]
  def change
    create_table :head_hunters do |t|
      t.string :name, null: false
      t.string :email, null: false
      t.string :password_digest, null: false
      t.string :username, null: false

      t.timestamps
    end

    add_index :head_hunters, [:email], unique: true
    add_index :head_hunters, [:username], unique: true
  end
end
