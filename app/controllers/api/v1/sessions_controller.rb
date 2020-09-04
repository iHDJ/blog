class Api::V1::SessionsController < ApplicationController
  # sign_in
  def create
    service = UserSignInService.new(params)
    result = service.exec

    if result[:success] then
      session[:user_id] = service.user.id
    end

    render_service_json(result)
  end

  # sign_out
  def destroy
    session.clear

    render_service_json({
      success: false,
      code: 200,
      message: "sign out success, welcome back",
    })
  end
end
