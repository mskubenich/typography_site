Rails.application.routes.draw do
  resources :country_flags, only: [:index]
  root to: 'pages#index'

  resources :attachments, only: [] do
    collection do
      post '/:entity_type', to: 'attachments#create'
    end
  end

  scope '(:locale)' do
    resources :orders, only: [:index, :create, :update, :destroy, :show]
    resources :products, only: [:index, :create, :update, :destroy, :show]
    resources :system_settings, only: [:index, :create, :update, :destroy, :show]
    resources :clients, only: [:index, :create, :update, :destroy, :show]
    resources :team_members, only: [:index, :create, :update, :destroy, :show]
    resources :solution_labels, only: [:index, :create, :update, :destroy, :show]
    resources :product_labels, only: [:index, :create, :update, :destroy, :show]
    resources :gallery_items, only: [:index, :create, :update, :destroy, :show]
    resources :landing, only: :index

    resources :pages, only:[] do
       get :check_session
    end

    resources :sessions, only: [:create] do
      collection do
        delete :destroy
        get :check
      end
    end

    get '/app', to: 'pages#app'
  end
end
