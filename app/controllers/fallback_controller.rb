# Renders HTML file for React App
# Inherits from ActionController::Base to render HTML
class FallbackController < ActionController::Base
  def index
    render file: 'public/index.html'
  end
end