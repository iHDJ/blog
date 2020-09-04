class CreateComments < ActiveRecord::Migration[6.0]
  def change
    create_table :comments do |t|
      t.bigint :user_id
      t.bigint :article_id
      t.string :content
      t.bigint :reply_user_id
      t.timestamps
    end
  end
end
