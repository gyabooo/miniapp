# DB設計

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true, unique: true|
|email|string|null: false, index: true, unique: true|
|password|string|null: false|

### Association
- has_many :posts

## postsテーブル
|Column|Type|Options|
|------|----|-------|
|title|string|null: false, index: true|
|text|text|null: false|
|good|integer||
|user|references|null: false, foreign_key: true|

### Association
- belongs_to :user
