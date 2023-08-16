module Api
  module V1
    class ChatsController < ApplicationController
      include ValidationHelper
      
      def get_chats
        sid = cookies[:sid]
        username = sid ? sessions.getSessionUser(sid) : ''
        
        if sid.blank? || !is_valid_username(username)
          send_error(401, 'auth-missing')
        else
          render json: {
            offlineUsers: User.get_offline_users(),
            loggedInUsers: User.get_logged_in_users(),
            messages: ChatApp.get_messages()
          }
        end
      end

      def create_chat
        sid = cookies[:sid]
        username = sid ? sessions.getSessionUser(sid) : ''
        message = params[:message]
        
        if sid.blank? || !is_valid_username(username)
          send_error(401, 'auth-missing')
        elsif message.blank?
          send_error(400, 'required-message')
        elsif !is_valid_message(message)
          send_error(400, 'invalid-message')
        else
          id = ChatApp.add_message(sender: username, message: message)
          render json: ChatApp.get_message(id)
        end
      end

      private

      def send_error(status_code, error_message)
        render status: status_code, json: { error: error_message }
      end
    end
  end
end
