class Api::V1::UsersController < ApplicationController
  def show
    authorization!
    Current.user.password_digest = ""

    render json: {
      success: "true",
      user: Current.user
    }
  end

  def create
    service = UserSignUpService.new(params)
    result = service.exec

    if result[:success] then
      session[:user_id] = Current.user.id
    end

    render_service_json(result)
  end
end
