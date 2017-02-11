class Client < ActiveRecord::Base

  attr_accessor :logo

  def logo_attachments
    Attachment.where entity_id: self.id, entity_type: 'client_logo'
  end

  after_destroy :destroy_attachments
  after_save :update_attachments

  private


  def destroy_attachments
    logo_attachments.destroy_all
  end

  def update_attachments
    update_logo_attachments
  end


  def update_logo_attachments
    self.logo ||= {}
    if self.logo[:id]
      Attachment.find_by_id_and_entity_type(self.logo[:id], 'client_logo').destroy if self.logo[:removed] == true || self.logo[:removed] == 'true'
    elsif self.logo[:file]
      Attachment.create file: self.logo[:file], entity_type: 'client_logo', entity_id: self.id
    end
    end
end
