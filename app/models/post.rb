class Post < ApplicationRecord
  blongs_to :user
  validates :title, presence: true
  validates :post, presence: true
end
