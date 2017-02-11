class ProductLabelsController < ApplicationController

  load_and_authorize_resource :product_label

  def index
    product_labels = ProductLabel.arel_table

    query = product_labels
            .project(Arel.star)
            .group(product_labels[:id])

    if !params[:sort_column].blank? && ['asc', 'desc'].include?(params[:sort_type])
        query = query.order(product_labels[params[:sort_column.to_sym]].send(params[:sort_type] == 'asc' ? :asc : :desc))
    else
        query = query.order(product_labels[:id].desc)
    end

    count_query = query.clone.project('COUNT(*)')

    @product_labels = ProductLabel.find_by_sql(query.take(10).skip((params[:page].to_i - 1) * 10).to_sql)
    @count = ProductLabel.find_by_sql(count_query.to_sql).count
  end

    def create
    @product_label = ProductLabel.new product_label_params

    if @product_label.save
      render json: { message: I18n.t('product_label.messages.success_upsert') }
    else
      render json: {errors: @product_label.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
    def update
    if @product_label.update_attributes product_label_params
      render json: { message: I18n.t('product_label.messages.success_upsert') }
    else
      render json: { errors: @product_label.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  def destroy
    @product_label.destroy
    render json: {ok: true}
  end

  def show

  end

  # related models actions

  private 

  def product_label_params
    params.require(:product_label).permit!
  end

end