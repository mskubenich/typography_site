class SolutionLabelsController < ApplicationController

  load_and_authorize_resource :solution_label

  def index
    solution_labels = SolutionLabel.arel_table

    query = solution_labels
            .project(Arel.star)
            .group(solution_labels[:id])

    if !params[:sort_column].blank? && ['asc', 'desc'].include?(params[:sort_type])
        query = query.order(solution_labels[params[:sort_column.to_sym]].send(params[:sort_type] == 'asc' ? :asc : :desc))
    else
        query = query.order(solution_labels[:id].desc)
    end

    count_query = query.clone.project('COUNT(*)')

    @solution_labels = SolutionLabel.find_by_sql(query.take(10).skip((params[:page].to_i - 1) * 10).to_sql)
    @count = SolutionLabel.find_by_sql(count_query.to_sql).count
  end

    def create
    @solution_label = SolutionLabel.new solution_label_params

    if @solution_label.save
      render json: { message: I18n.t('solution_label.messages.success_upsert') }
    else
      render json: {errors: @solution_label.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
    def update
    if @solution_label.update_attributes solution_label_params
      render json: { message: I18n.t('solution_label.messages.success_upsert') }
    else
      render json: { errors: @solution_label.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  def destroy
    @solution_label.destroy
    render json: {ok: true}
  end

  def show

  end

  # related models actions

  private 

  def solution_label_params
    params.require(:solution_label).permit!
  end

end