class ItemsController < ApplicationController

  # GET /items
  def index
    items = Item.all
    render json: items, status: :ok
  end

  # # GET /items/:id
  # def show
  #   item = Item.find_by(id: params[:id])
  #   if item
  #     render json: item, status: :ok
  #   else
  #     render json: { error: 'Item not found' }, status: :not_found
  #   end
  # end

  # POST /items
  def create
    # Bang raises exception if record is invalid
    item = Item.create!(item_params)
    render json: item, status: :created
  end

  # PATCH /items/:id
  def update
    item = Item.find_by(id: params[:id])
    if item
      item.update(item_params)
      render json: item, status: :accepted
    else
      render json: { errors: ['Item not found'] }, status: :not_found
    end
  end

  # DELETE /items/:id
  def destroy
    item = Item.find_by(id: params[:id])
    if item
      item.destroy
      head :no_content
    else
      render json: { errors: ['Item not found'] }, status: :not_found
    end
  end

  private

  def item_params
    params.permit(:name, :description, :warehouse_id)
  end

end
