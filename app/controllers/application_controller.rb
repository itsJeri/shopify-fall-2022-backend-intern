class ApplicationController < ActionController::API
  include ActionController::Cookies

  # All subclasses performing CRUD that raises an exception will be rescued with HTTP response 422
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

  private

  def render_unprocessable_entity_response(e)
    render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
  end
end
