Rails.application.routes.draw do
  # resources :users, only: [:create]
  devise_for :users, controllers: {
    registrations: 'users/registrations',
    sessions: 'users/sessions',
    passwords: 'users/passwords'
  } 

  root 'posts#index'
  resources :posts
end
