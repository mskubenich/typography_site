class GalleryItemsController < ApplicationController

  load_and_authorize_resource :gallery_item

  def index
    gallery_items = GalleryItem.arel_table

    query = gallery_items
            .project(Arel.star)
            .group(gallery_items[:id])

    if !params[:sort_column].blank? && ['asc', 'desc'].include?(params[:sort_type])
        query = query.order(gallery_items[params[:sort_column.to_sym]].send(params[:sort_type] == 'asc' ? :asc : :desc))
    else
        query = query.order(gallery_items[:id].desc)
    end

    count_query = query.clone.project('COUNT(*)')

    @gallery_items = GalleryItem.find_by_sql(query.take(10).skip((params[:page].to_i - 1) * 10).to_sql)
    @count = GalleryItem.find_by_sql(count_query.to_sql).count
  end

    def create
    @gallery_item = GalleryItem.new gallery_item_params

    if @gallery_item.save
      render json: { message: I18n.t('gallery_item.messages.success_upsert') }
    else
      render json: {errors: @gallery_item.errors }, status: :unprocessable_entity
    end
  end
  
    def update
    if @gallery_item.update_attributes gallery_item_params
      render json: { message: I18n.t('gallery_item.messages.success_upsert') }
    else
      render json: { errors: @gallery_item.errors }, status: :unprocessable_entity
    end
  end
  
  def destroy
    @gallery_item.destroy
    render json: {ok: true}
  end

  def show

  end

  # related models actions

  private 

  def gallery_item_params
    params.require(:gallery_item).permit!
  end

end