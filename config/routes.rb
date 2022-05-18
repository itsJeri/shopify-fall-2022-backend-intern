Rails.application.routes.draw do
  resources :warehouse_items
  resources :warehouses
  resources :items, only: [:index, :show, :create, :update, :destroy]
  
  # Handle non-API requests
  get '*path',
    to: 'fallback#index',
    constraints: ->(req) { !req.xhr? && req.format.html? }
end
