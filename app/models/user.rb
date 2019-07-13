class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :posts, dependent: :destroy
  has_one_attached :avatar

  validates :name, presence: true
  with_options on: :create? do
    validate :create_validate_avatar
  end

  def create_validate_avatar
    return unless avatar.attached?
    if name.blank? || password.blank? || password_confirmation.blank?
      avatar.purge
    end
  end

  def remember_me
    true
  end
end
