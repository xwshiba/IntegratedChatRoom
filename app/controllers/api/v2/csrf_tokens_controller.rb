module Api
  module V2
    class CsrfTokensController < ApplicationController
      def show
        render json: { token: form_authenticity_token }
      end
    end
  end
end
