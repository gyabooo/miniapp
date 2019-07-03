class ChangePostToTextPosts < ActiveRecord::Migration[5.2]
  def change
    rename_column :posts, :post, :text
  end
end
