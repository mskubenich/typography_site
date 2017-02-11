class TeamMembersController < ApplicationController

  load_and_authorize_resource :team_member

  def index
    team_members = TeamMember.arel_table

    query = team_members
            .project(Arel.star)
            .group(team_members[:id])

    if !params[:sort_column].blank? && ['asc', 'desc'].include?(params[:sort_type])
        query = query.order(team_members[params[:sort_column.to_sym]].send(params[:sort_type] == 'asc' ? :asc : :desc))
    else
        query = query.order(team_members[:id].desc)
    end

    count_query = query.clone.project('COUNT(*)')

    @team_members = TeamMember.find_by_sql(query.take(10).skip((params[:page].to_i - 1) * 10).to_sql)
    @count = TeamMember.find_by_sql(count_query.to_sql).count
  end

    def create
    @team_member = TeamMember.new team_member_params

    if @team_member.save
      render json: { message: I18n.t('team_member.messages.success_upsert') }
    else
      render json: {errors: @team_member.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
    def update
    if @team_member.update_attributes team_member_params
      render json: { message: I18n.t('team_member.messages.success_upsert') }
    else
      render json: { errors: @team_member.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  def destroy
    @team_member.destroy
    render json: {ok: true}
  end

  def show

  end

  # related models actions

  private 

  def team_member_params
    params.require(:team_member).permit!
  end

end