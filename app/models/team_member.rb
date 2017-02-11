class TeamMember < ActiveRecord::Base

  attr_accessor :photo

  def photo_attachments
    Attachment.where entity_id: self.id, entity_type: 'team_member_photo'
  end

  after_destroy :destroy_attachments
  after_save :update_attachments

  private


  def destroy_attachments
    photo_attachments.destroy_all
  end

  def update_attachments
    update_photo_attachments
  end


  def update_photo_attachments
    self.photo ||= {}
    if self.photo[:id]
      Attachment.find_by_id_and_entity_type(self.photo[:id], 'team_member_photo').destroy if self.photo[:removed] == true || self.photo[:removed] == 'true'
    elsif self.photo[:file]
      Attachment.create file: self.photo[:file], entity_type: 'team_member_photo', entity_id: self.id
    end
    end
end
