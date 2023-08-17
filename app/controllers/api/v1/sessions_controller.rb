# app/controllers/api/v1/sessions_controller.rb
module Api
  module V1
    class SessionsController < ApplicationController
      include SessionsHelper
      include ValidationHelper
      include ChatApp::ClassMethods
      include Users::ClassMethods
    
      def get_session
        session_details = get_session_details(request)

        if session_details[:sid].blank? || !ValidationHelper.is_valid_username?(session_details[:username])
          send_error(401, 'auth-missing')
        else
          render json: { username: session_details[:username] }
        end
      end

      def create_session
        session_details = get_session_details(request)

        username = params[:username]

        if !ValidationHelper.is_valid_username?(session_details[:username]) # validates the username
          send_error(400, 'required-username')
        elsif username == 'dog' # if username is dog, return 403 forbidden to show auth failed
          send_error(403, 'auth-insufficient')
        else
          session[:username] = username # Add a session for the authenticated user
          users_manager.set_user_status(username, true)
                    
          render json: { # Sends a JSON response with additional data to avoid an extra request
            offlineUsers: users_manager.get_offline_users(),
            loggedInUsers: users_manager.get_logged_in_users(),
            messages: chat_manager.get_messages()
          }
        end
      end

      def delete_session
        session_details = get_session_details(request)
        sid = session_details[:sid]
        username = session_details[:username]

        cookies.delete(:sid) if sid.present?

        if username.present?
          users_manager.set_user_status(username, false)
          render json: { username: username } 
          # Send a JSON response with the username of the session, if it exists.
          # Don't report any error if sid or session didn't exist
          # Because that means we already have what we want
        end
      end

      private

      def send_error(status_code, error_message)
        render status: status_code, json: { error: error_message }
      end
    end
  end
end
