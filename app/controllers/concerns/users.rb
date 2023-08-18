# app/controllers/concerns/users.rb
# since currently the app only has one instance, it's ok for now
# if we want to have multiple instances, we can make it a class or use a database to store the data

module Users
  DEFAULT_USERS = {
    'admin': true
  }.freeze

  def self.included(base)
    base.extend(ClassMethods)
  end

  module ClassMethods
    def users_manager
      @users_manager ||= Manager.instance
    end
  end

  class Manager
    require 'singleton'
    include Singleton
    
    def initialize
      @users = DEFAULT_USERS.dup
    end

    def set_user_status(username, status)
      @users[username] = status
    end

    def get_offline_users
      @users.select { |_, status| status == false }.keys
    end

    def get_logged_in_users
      @users.select { |_, status| status == true }.keys
    end
  end
end
