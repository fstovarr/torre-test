class CompaniesHeadHunter < ApplicationRecord
    belongs_to :company
    belongs_to :head_hunter

    enum status: {
        pending: 0,
        accepted: 1
    }

    validates_presence_of :status, :head_hunter_id, :company_id

    def accept!
        self.status = :accepted
        self.save!
    end
end
