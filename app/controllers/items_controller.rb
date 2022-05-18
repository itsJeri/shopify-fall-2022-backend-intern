class ItemsController < ApplicationController

  # GET /items
  def index
    items = Item.all
    render json: items, status: :ok
  end

  # POST /items
  def create
    # Bang raises exception if record is invalid
    item = Item.create!(item_params)
    render json: item, status: :created
  end

  # PATCH /items/:id
  def update
    item = Item.find_by!(id: params[:id])
    item.update(item_params)
    render json: item, status: :accepted
  end

  # DELETE /items/:id
  def destroy
    item = Item.find_by!(id: params[:id])
    item.destroy
    head :no_content
  end

  private

  def item_params
    params.permit(:name, :description, :warehouse_id)
  end

end
