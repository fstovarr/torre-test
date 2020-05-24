class CreateCompanies < ActiveRecord::Migration[5.2]
  def change
    create_table :companies do |t|
      t.string :name, null: false
      t.string :email, null: false
      t.string :password_digest, null: false
      t.string :username, null: false

      t.timestamps
    end

    add_index :companies, [:email], unique: true
    add_index :companies, [:username], unique: true
  end
end
