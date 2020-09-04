class ApplicationController < ActionController::Base
  class AuthorizationException < StandardError; end

  skip_before_action :verify_authenticity_token

  rescue_from AuthorizationException, with: :user_not_authorization
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  def authorization!
    user_id = session[:user_id]

    raise AuthorizationException.new if user_id == nil

    if user_id != nil then
      Current.user = User.find_by(user_id)
      raise AuthorizationException.new if Current.user == nil
    end
  end

  def admin_authorization!
    authorization!

    raise AuthorizationException.new if !Current.user.is_admin
  end

  def render_service_json(result)
    if result[:success] then
      render json: result
      return
    end

    render status: 400, json: result
  end

  private

  def record_not_found
    render status: 404, json: {
      success: false,
      message: "访问的资源不存在",
    }
  end

  def user_not_authorization
    render status: 404, json: {
      success: false,
      message: "你没有权限",
    }
  end
end
