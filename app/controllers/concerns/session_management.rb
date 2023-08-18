# app/controllers/concerns/session_management.rb
module SessionManagement
  include SessionData::ClassMethods

  def get_session_details(request)
    cookie_data = cookies[:user_session]
    parsed_cookie_data = JSON.parse(cookie_data) if cookie_data

    sid = parsed_cookie_data&.fetch('sid', '') || ''
    username = parsed_cookie_data&.fetch('username', '') || ''

    { sid: sid, username: username }
  end

  def session_exists?(sid)
    session_manager.get_session_user(sid).present?
  end

  def store_user_session(username)
    sid = SecureRandom.uuid
    session_manager.add_session(sid, username)
    cookie_data = {
      username: username,
      sid: sid
    }

    cookies[:user_session] = {
      value: cookie_data.to_json,
      expires: 1.day.from_now
    }

    sid
  end

  def delete_user_session(sid)
    session_manager.delete_session(sid)
  end

  def check_other_user_session(username)
    session_manager.check_user_login_status(username)
  end

  def update_user_login_status(username)
    is_logged_in = check_other_user_session(username)
    users_manager.set_user_status(username, is_logged_in)
  end

  def send_error(status_code, error_message)
    render json: { error: error_message }, status: status_code
  end
end
