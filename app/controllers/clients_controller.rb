class ClientsController < ApplicationController

  load_and_authorize_resource :client

  def index
    clients = Client.arel_table

    query = clients
            .project(Arel.star)
            .group(clients[:id])

    if !params[:sort_column].blank? && ['asc', 'desc'].include?(params[:sort_type])
        query = query.order(clients[params[:sort_column.to_sym]].send(params[:sort_type] == 'asc' ? :asc : :desc))
    else
        query = query.order(clients[:id].desc)
    end

    count_query = query.clone.project('COUNT(*)')

    @clients = Client.find_by_sql(query.take(10).skip((params[:page].to_i - 1) * 10).to_sql)
    @count = Client.find_by_sql(count_query.to_sql).count
  end

    def create
    @client = Client.new client_params

    if @client.save
      render json: { message: I18n.t('client.messages.success_upsert') }
    else
      render json: {errors: @client.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
    def update
    if @client.update_attributes client_params
      render json: { message: I18n.t('client.messages.success_upsert') }
    else
      render json: { errors: @client.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  def destroy
    @client.destroy
    render json: {ok: true}
  end

  def show

  end

  # related models actions

  private 

  def client_params
    params.require(:client).permit!
  end

end