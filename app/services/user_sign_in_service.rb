class UserSignInService < BaseService
  attr_reader :user

  def validate
    err = validate_field
    if err != nil
    validate_user
  end

  def execute
  end

  private

  def validate_field
    username, password = param[:username], param[:password]

    param_error = render_error(code: 400, message: "参数错误")
    return param_error if username.blank?
    return param_error if username.blank?

    @username, @password = username, password
    return nil
  end

  def validate_user
    @user = User.find_by!(name: @username)

    if !user.authenticate(@password) then
      return result_error(code: 400, message: "账号或密码错误")
    end
  end
end
