class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.string :title, null: false
      t.text :post, null: false
      t.timestamps
    end
    add_index :posts, :title
  end
end
