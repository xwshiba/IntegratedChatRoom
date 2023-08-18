# app/controllers/api/v1/sessions_controller.rb
module Api
  module V1
    class SessionsController < ApplicationController
      include SessionManagement
      include ValidationHelper
      include ChatApp::ClassMethods
      include Users::ClassMethods
    
      def get_session
        session_details = get_session_details(request)
        username = session_details[:username]
        sid = session_details[:sid]

        if !session_exists?(sid) || !ValidationHelper.is_valid_username?(username)
          send_error(401, 'auth-missing')
        else
          render json: { username: username }
        end
      end

      def create_session
        username = params[:username]

        if !ValidationHelper.is_valid_username?(username) # validates the username
          send_error(400, 'required-username')
        elsif username == 'dog' # if username is dog, return 403 forbidden to show auth failed
          send_error(403, 'auth-insufficient')
        else
          store_user_session(username)
          users_manager.set_user_status(username, true)

          render json: {
            offlineUsers: users_manager.get_offline_users(),
            loggedInUsers: users_manager.get_logged_in_users(),
            messages: chat_manager.get_messages()
          }
        end
      end


      def delete_session
        session_details = get_session_details(request)
        username = session_details[:username]
        sid = session_details[:sid]

        # Clear all cookies
        cookies.each do |cookie_name, _|
          cookies.delete(cookie_name)
        end

        if username.present?
          users_manager.set_user_status(username, false)
          delete_session(sid) # Delete the session from SessionData
          update_user_login_status(username) # Update the user's login status
          render json: { username: username }
          # Send a JSON response with the username of the session, if it exists.
          # Don't report any error if sid or session didn't exist
          # Because that means we already have what we want
        end
      end

    end
  end
end
