Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "api/v2/sessions#get_session"

  # chat app routes
  resources :chats, only: [:index, :create]

  # api specific routes
  namespace :api do    
    namespace :v2 do
      # csrf token route
      get 'csrf_token', to: 'csrf_tokens#show'
      
      get '/session', to: 'sessions#get_session'
      post '/session', to: 'sessions#create_session'
      delete '/session', to: 'sessions#delete_session'

      get '/chats', to: 'chats#get_chats'
      post '/chats', to: 'chats#create_chat'

    end
  end
end
