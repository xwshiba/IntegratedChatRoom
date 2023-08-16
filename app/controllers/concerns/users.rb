# app/controllers/concerns/users.rb
# since currently the app only has one instance, it's ok to use it as a module
# if we want to have multiple instances, we can make it a class and use it as a singleton
# or use a database to store the data

module Users
  def self.included(base)
    base.extend(ClassMethods)
  end

  module ClassMethods
    def users_manager
      @users_manager ||= Manager.new
    end
  end

  class Manager
    def initialize
      @users = {}
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
