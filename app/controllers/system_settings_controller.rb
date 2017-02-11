class SystemSettingsController < ApplicationController

  load_and_authorize_resource :system_setting

  def index
    system_settings = SystemSetting.arel_table

    query = system_settings
            .project(Arel.star)
            .group(system_settings[:id])

    if !params[:sort_column].blank? && ['asc', 'desc'].include?(params[:sort_type])
        query = query.order(system_settings[params[:sort_column.to_sym]].send(params[:sort_type] == 'asc' ? :asc : :desc))
    else
        query = query.order(system_settings[:id].desc)
    end

    count_query = query.clone.project('COUNT(*)')

    @system_settings = SystemSetting.find_by_sql(query.take(10).skip((params[:page].to_i - 1) * 10).to_sql)
    @count = SystemSetting.find_by_sql(count_query.to_sql).count
  end

    def create
    @system_setting = SystemSetting.new system_setting_params

    if @system_setting.save
      render json: { message: I18n.t('system_setting.messages.success_upsert') }
    else
      render json: {errors: @system_setting.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
    def update
    if @system_setting.update_attributes system_setting_params
      render json: { message: I18n.t('system_setting.messages.success_upsert') }
    else
      render json: { errors: @system_setting.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  def destroy
    @system_setting.destroy
    render json: {ok: true}
  end

  def show

  end

  # related models actions

  private 

  def system_setting_params
    params.require(:system_setting).permit!
  end

end