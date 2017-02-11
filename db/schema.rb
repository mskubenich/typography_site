# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170211134605) do

  create_table "attachments", force: :cascade do |t|
    t.integer  "entity_id"
    t.string   "entity_type"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.string   "file_file_name"
    t.string   "file_content_type"
    t.integer  "file_file_size"
    t.datetime "file_updated_at"
  end

  create_table "clients", force: :cascade do |t|
    t.integer  "logo_id"
    t.string   "title"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["logo_id"], name: "index_clients_on_logo_id"
  end

  create_table "gallery_items", force: :cascade do |t|
    t.integer  "image_id"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["image_id"], name: "index_gallery_items_on_image_id"
  end

  create_table "product_labels", force: :cascade do |t|
    t.string   "title"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "products", force: :cascade do |t|
    t.integer  "image_id"
    t.string   "title"
    t.text     "text"
    t.integer  "offset_printing_price_id"
    t.integer  "digital_printing_price_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["digital_printing_price_id"], name: "index_products_on_digital_printing_price_id"
    t.index ["image_id"], name: "index_products_on_image_id"
    t.index ["offset_printing_price_id"], name: "index_products_on_offset_printing_price_id"
  end

  create_table "roles", force: :cascade do |t|
    t.string "name"
  end

  create_table "sessions", force: :cascade do |t|
    t.string   "token"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "solution_labels", force: :cascade do |t|
    t.string   "title"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "system_settings", force: :cascade do |t|
    t.string   "address"
    t.string   "phone_number"
    t.string   "site"
    t.string   "email"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "team_members", force: :cascade do |t|
    t.integer  "photo_id"
    t.string   "name"
    t.string   "position"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["photo_id"], name: "index_team_members_on_photo_id"
  end

  create_table "users", force: :cascade do |t|
    t.string  "encrypted_password"
    t.string  "salt"
    t.string  "email"
    t.string  "login"
    t.boolean "confirmed"
    t.string  "confirmation_token"
    t.integer "role_id"
  end

end
