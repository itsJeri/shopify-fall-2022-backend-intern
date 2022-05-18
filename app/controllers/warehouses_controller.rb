class WarehousesController < ApplicationController

  # GET /warehouses
  def index
    warehouses = Warehouse.all
    render json: warehouses, status: :ok
  end

  # POST /warehouses
  def create
    warehouse = Warehouse.create(warehouse_params)
    render json: warehouse, status: :created
  end

  private

  def warehouse_params
    params.permit(:name, :street, :city, :country)
  end

end
