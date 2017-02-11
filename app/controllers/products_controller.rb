class ProductsController < ApplicationController

  load_and_authorize_resource :product

  def index
    products = Product.arel_table

    query = products
            .project(Arel.star)
            .group(products[:id])

    if !params[:sort_column].blank? && ['asc', 'desc'].include?(params[:sort_type])
        query = query.order(products[params[:sort_column.to_sym]].send(params[:sort_type] == 'asc' ? :asc : :desc))
    else
        query = query.order(products[:id].desc)
    end

    count_query = query.clone.project('COUNT(*)')

    @products = Product.find_by_sql(query.take(10).skip((params[:page].to_i - 1) * 10).to_sql)
    @count = Product.find_by_sql(count_query.to_sql).count
  end

    def create
    @product = Product.new product_params

    if @product.save
      render json: { message: I18n.t('product.messages.success_upsert') }
    else
      render json: {errors: @product.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
    def update
    if @product.update_attributes product_params
      render json: { message: I18n.t('product.messages.success_upsert') }
    else
      render json: { errors: @product.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  def destroy
    @product.destroy
    render json: {ok: true}
  end

  def show

  end

  # related models actions

  private 

  def product_params
    params.require(:product).permit!
  end

end