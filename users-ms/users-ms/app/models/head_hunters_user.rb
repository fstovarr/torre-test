class HeadHuntersUser < ApplicationRecord
    belongs_to :user
    belongs_to :head_hunter

    enum status: {
        pending: 0,
        accepted: 1
    }

    validates_presence_of :status, :user_id, :head_hunter_id

    def accept!
        self.status = :accepted
        self.save!
    end
end
