class ChatsController < ApplicationController
  def index
    @chat_manager = ChatManager.new
    @messages = @chat_manager.get_messages(session[:username])
  end

  def create
    @chat_manager = ChatManager.new
    @chat_manager.add_message(session[:username], params[:message])
    render json: { success: true }
  end
end
