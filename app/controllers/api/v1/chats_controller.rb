module Api
  module V1
    class ChatsController < ApplicationController
      include SessionManagement
      include ValidationHelper
      include Users::ClassMethods
      include ChatApp::ClassMethods
      
      def get_chats
        session_details = get_session_details(request)
        username = session_details[:username]
        sid = session_details[:sid]
        puts "Session cookie: #{session_details}"
        puts "username: #{username}"
        puts "Sid: #{sid}"

        if !session_exists?(sid) || !ValidationHelper.is_valid_username?(username)
          puts "falled here!"
          send_error(401, 'auth-missing')
        else
          render json: {
            offlineUsers: users_manager.get_offline_users(),
            loggedInUsers: users_manager.get_logged_in_users(),
            messages: chat_manager.get_messages()
          }
        end
      end

      def create_chat
        session_details = get_session_details(request)
        username = session_details[:username]
        sid = session_details[:sid]

        message = params[:message]
        
        if !ValidationHelper.is_valid_username?(username)
          send_error(401, 'auth-missing')
        elsif message.blank?
          send_error(400, 'required-message')
        elsif !ValidationHelper.is_valid_message?(message)
          send_error(400, 'invalid-message')
        else
          id = chat_manager.add_message(username, message)
          render json: chat_manager.get_message(id)
        end
      end

      private

      def send_error(status_code, error_message)
        render status: status_code, json: { error: error_message }
      end
    end
  end
end
