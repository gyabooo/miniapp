class Post < ApplicationRecord
  belongs_to :user
  validates :title, presence: true
  validates :text, presence: true

  scope :post_count, -> (user_id) { where(user_id: user_id).count}
end
