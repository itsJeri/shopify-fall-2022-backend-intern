Rails.application.routes.draw do
  
  
  # Handle non-API requests
  get '*path',
    to: 'fallback#index',
    constraints: ->(req) { !req.xhr? && req.format.html? }
end
