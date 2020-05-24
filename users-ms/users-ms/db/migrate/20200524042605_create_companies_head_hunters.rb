class CreateCompaniesHeadHunters < ActiveRecord::Migration[5.2]
  def change
    create_table :companies_head_hunters do |t|
      t.integer :head_hunter_id, null: false, foreign_key: true
      t.integer :company_id, null: false, foreign_key: true
      t.integer :status, default: 0

      t.timestamps
    end

    add_index :companies_head_hunters, [:company_id, :head_hunter_id], unique: true
  end
end
