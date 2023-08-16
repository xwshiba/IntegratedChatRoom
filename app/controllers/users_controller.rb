class UsersController < ApplicationController
  include ValidationHelper
  include UsersManager

  def set_status
    username = params[:username] # Get the username from your frontend
    status = params[:status] # Get the status from your frontend (e.g., true or false)
    
    if !username.blank? && isValidUsername(username) # Check if username is present
      set_user_status(username, status) # Assuming users is your object for handling user info
      head :ok
    else
      head :bad_request
    end
  end

  def offline_users
    offline_users = get_offline_users
    render json: { offlineUsers: get_offline_users }
  end

  def logged_in_users
    logged_in_users = get_logged_in_users # Assuming users has a method for this
    render json: { loggedInUsers: logged_in_users }
  end

  private

  def users
    @users ||= UsersManager.new # Initialize your users manager object here
  end
end
