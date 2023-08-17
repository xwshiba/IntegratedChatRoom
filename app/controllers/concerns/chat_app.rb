require 'securerandom'

module ChatApp

  DEFAULT_MESSAGES = {
  'id1' => {
    id: 'id1',
    message: 'Welcome to the chat room!',
    sender: 'admin',
    date: Time.now
  },
  'id2' => {
    id: 'id2',
    message: "How's your day going?",
    sender: 'admin',
    date: Time.now
  }
}.freeze

  class ChatManager   
    def initialize
      @messages = DEFAULT_MESSAGES.dup
    end
    
    def add_message(sender, message)
      id = SecureRandom.uuid
      @messages[sender] ||= []
      @messages[sender] << {
        id: id,
        sender: sender,
        message: message,
        date: Time.now
      }
      id
    end
    
    def get_messages
      @messages
    end
    
    def get_message(id)
      @messages[id]
    end
  end
end
