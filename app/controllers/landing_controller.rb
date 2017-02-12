class LandingController < ApplicationController
  skip_before_action :authenticate_user

  def index
    @gallery_items = GalleryItem.all
  end
end