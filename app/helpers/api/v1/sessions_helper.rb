module Api
  module V1
    module SessionsHelper
      def get_session_details(request)
        sid = cookies[:sid]
        username = sid ? session[:username] : ''
        { sid: sid, username: username }
      end

      def send_error(status_code, error_message)
        render json: { error: error_message }, status: status_code
      end
    end
  end
end
