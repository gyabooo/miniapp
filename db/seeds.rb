User.create!([
  {name: "TEST003", email: "test003@test.local", encrypted_password: "$2a$11$eeezCY52UyYWRaFxHyhh8uXoJ3TyfeV/I.6zceELQw7eADpfRClFi", reset_password_token: nil, reset_password_sent_at: nil, remember_created_at: nil},
  {name: "test000", email: "test000@test.local", encrypted_password: "$2a$11$iJ8Rj9Bkq0IsAlCD/YEuFevLHxppedhhfwQcuBDUxTwcPouh6f.uy", reset_password_token: nil, reset_password_sent_at: nil, remember_created_at: nil},
  {name: "test111", email: "test111@test.local", encrypted_password: "$2a$11$kqI1ztOVKBt86bMPzO5INO3ep7CZrBgeoQgEC93TAgMXEGwKKYi/i", reset_password_token: nil, reset_password_sent_at: nil, remember_created_at: nil},
  {name: "test222", email: "test222@test.local", encrypted_password: "$2a$11$DtCJCIlGo1aAnLgHnBXaCOJdgJsYru.e2HuYxJPRjzihTEpvXk8Am", reset_password_token: nil, reset_password_sent_at: nil, remember_created_at: nil},
  {name: "test444", email: "test444@test.local", encrypted_password: "$2a$11$rw/5vmf4laR8el1DxdRYTuHER.ZcemROjUY54e.aIl0u5VfZXPV22", reset_password_token: nil, reset_password_sent_at: nil, remember_created_at: nil},
  {name: "test555", email: "test555@test.local", encrypted_password: "$2a$11$YPhuIv9aZwFghF28umBhi.zOZyih4yLQ/7rVKjsutyAdONaL1VIp.", reset_password_token: nil, reset_password_sent_at: nil, remember_created_at: nil},
  {name: "test666", email: "test666@test.local", encrypted_password: "$2a$11$T4RQ.Z1/tIAwa535cDajmeLQavdA4NQhtnEHQMmQ3j5ejadw9KCi.", reset_password_token: nil, reset_password_sent_at: nil, remember_created_at: nil},
  {name: "seita_matsumoto", email: "seita_matsumoto@test.local", encrypted_password: "$2a$11$iT72qFxNGCJz/wqrN9G4z.WAuOeTuwI4k0/8huzFrlPwmG51VKYjS", reset_password_token: nil, reset_password_sent_at: nil, remember_created_at: "2019-07-13 18:59:05"},
  {name: "sss", email: "sss@sss.local", encrypted_password: "$2a$11$VkTcZrPoNIRh6zwxtQNkiOKj3pY9B8m/iVgwbnvuJOJNPTSptm5aG", reset_password_token: nil, reset_password_sent_at: nil, remember_created_at: nil},
  {name: "yyy", email: "yyy@yyy.local", encrypted_password: "$2a$11$ulDyY2eSULpLbowClsOiFef3f2q72JqiZnJtB22ECMERSKYfrxHSK", reset_password_token: nil, reset_password_sent_at: nil, remember_created_at: nil}
])
Post.create!([
  {title: "eeee", text: "eggrg", good: nil, user_id: 28},
  {title: "fggghg", text: "今日は眠い。\n肉食い過ぎた。", good: nil, user_id: 28},
  {title: "TESTTESTTEST", text: "AAA\nBBB\nCCC\nDDD\nEEE\nFFF", good: nil, user_id: 28},
  {title: "TTTTTTT", text: "テストだよ", good: nil, user_id: 32},
  {title: "ううううう", text: "りいいいいいいい\nいいいいい", good: nil, user_id: 32},
  {title: "今日は", text: "だるいだるいだるい\nああああああああああ\nいいいいいいいいいい", good: nil, user_id: 29},
  {title: "おおおおおおおおおお", text: "いいいいいいいいいいいいいいいいいいいいい", good: nil, user_id: 29},
  {title: "NNNNNNNN", text: "肩が凝ってますね〜", good: nil, user_id: 33},
  {title: "そうそう", text: "３０超えたら疲れとれん", good: nil, user_id: 29},
  {title: "にゃーん", text: "だふるライフ", good: nil, user_id: 34}
])
