class OrdersController < ApplicationController

  load_and_authorize_resource :order

  def index
    orders = Order.arel_table

    query = orders
            .project(Arel.star)
            .group(orders[:id])

    if !params[:sort_column].blank? && ['asc', 'desc'].include?(params[:sort_type])
        query = query.order(orders[params[:sort_column.to_sym]].send(params[:sort_type] == 'asc' ? :asc : :desc))
    else
        query = query.order(orders[:id].desc)
    end

    count_query = query.clone.project('COUNT(*)')

    @orders = Order.find_by_sql(query.take(10).skip((params[:page].to_i - 1) * 10).to_sql)
    @count = Order.find_by_sql(count_query.to_sql).count
  end

    def create
    @order = Order.new order_params

    if @order.save
      render json: { message: I18n.t('order.messages.success_upsert') }
    else
      render json: {errors: @order.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
    def update
    if @order.update_attributes order_params
      render json: { message: I18n.t('order.messages.success_upsert') }
    else
      render json: { errors: @order.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  def destroy
    @order.destroy
    render json: {ok: true}
  end

  def show

  end

  # related models actions

  private 

  def order_params
    params.require(:order).permit!
  end

end