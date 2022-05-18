Rails.application.routes.draw do
  resources :warehouses, only: [:index, :create]
  resources :items, only: [:index, :create, :update, :destroy]
  
  # Handle non-API requests
  get '*path',
    to: 'fallback#index',
    constraints: ->(req) { !req.xhr? && req.format.html? }
end
