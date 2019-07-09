Rails.application.routes.draw do
  # resources :users, only: [:create]
  devise_for :users
  root 'posts#index'
  resources :posts
end
