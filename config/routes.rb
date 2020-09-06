require 'open-uri'

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :api do
    namespace :v1 do
      resources :articles do
        resources :comments, only: [:index, :create, :destroy]
      end

      resource :user, only: [:show, :create]
      resource :session, only: [:create, :destroy]
    end
  end


  root to: "frontend#show"
  match "/*path", to: "frontend#show", via: [:get]
end
