class UsersController < ApplicationController
  include ValidationHelper
  include Users

  def set_status
    username = params[:username] # Get the username from your frontend
    status = params[:status] # Get the status from your frontend (e.g., true or false)
    
    if !username.blank? && is_valid_username(username) # Check if username is present
      users_manager.set_user_status(username, status) # Use the method from the Users module
      head :ok
    else
      head :bad_request
    end
  end

  def offline_users
    offline_users = users_manager.get_offline_users
    render json: { offlineUsers: offline_users }
  end

  def logged_in_users
    logged_in_users = users_manager.get_logged_in_users # Use the method from the Users module
    render json: { loggedInUsers: logged_in_users }
  end
end
