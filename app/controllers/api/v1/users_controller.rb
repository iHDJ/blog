class Api::V1::UsersController < ApplicationController
  def create
    service = UserSignUpService.new(params)
    result = service.exec

    if result[:success] then
      session[:user_id] = service.user.id
    end

    render_service_json(result)
  end
end
