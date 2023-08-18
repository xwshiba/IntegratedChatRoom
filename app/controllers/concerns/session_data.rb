module SessionData
  def self.included(base)
    base.extend(ClassMethods)
  end

  module ClassMethods
    def session_manager
      @session_manager ||= SessionManager.instance
    end
  end

  class SessionManager
    require 'singleton'
    include Singleton
    
    def initialize
      @sessions = {} # Initialize the @sessions hash here
    end

    def add_session(sid, username)
      @sessions[sid] = { username: username }
      sid
    end

    def get_session_user(sid)
      @sessions[sid]&.fetch(:username, nil)
    end

    def delete_session(sid)
      @sessions.delete(sid)
    end

    def check_user_login_status(username)
      @sessions.values.any? { |session| session[:username] == username }
    end
  end
end
