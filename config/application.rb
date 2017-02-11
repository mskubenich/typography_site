require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module TypographySite
  class Application < Rails::Application
      config.assets.paths << Rails.root.join("node_modules")

      config.i18n.enforce_available_locales = false
      config.i18n.available_locales = [:en, :ua]
      config.i18n.default_locale = :ua
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
  end
end
