module ChatApp

  id_1 = SecureRandom.uuid
  id_2 = SecureRandom.uuid

  DEFAULT_MESSAGES = {
    id_1 => {
      id: id_1,
      message: 'Welcome to the chat room!',
      sender: 'admin',
      date: Time.now
    },
    id_2 => {
      id: id_2,
      message: "How's your day going?",
      sender: 'admin',
      date: Time.now
    }
  }.freeze

  class ChatManager
    require 'singleton'
    include Singleton
    
    def initialize
      @messages = DEFAULT_MESSAGES.dup
    end

    def add_message(sender, message)
      cur_id = SecureRandom.uuid
      @messages[cur_id] = {
        id: cur_id,
        sender: sender,
        message: message,
        date: Time.now
      }
      cur_id
    end

    def get_messages
      @messages
    end

    def get_message(id)
      @messages[id]
    end
  end

  def self.included(base)
    base.extend(ClassMethods)
  end

  module ClassMethods
    def chat_manager
      @chat_manager ||= ChatManager.instance
    end
  end
end