Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  # chat app routes
  resources :chats, only: [:index, :create]

  # api specific routes
  namespace :api do
    namespace :v1 do
      get '/session', to: 'sessions#get_session'
      post '/session', to: 'sessions#create_session'
      delete '/session', to: 'sessions#delete_session'

      get '/chats', to: 'chats#get_chats'
      post '/chats', to: 'chats#create_chat'

    end
  end

end
