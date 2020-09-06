class UserSignInService < BaseService
  def validate
    err = validate_field
    return err if err != nil
    validate_user
  end

  def execute
  end

  private

  def validate_field
    username, password = param[:username], param[:password]

    param_error = result_error(code: 400, message: "参数错误")
    return param_error if username.blank?
    return param_error if username.blank?

    @username, @password = username, password
    return nil
  end

  def validate_user
    Current.user = User.find_by!(name: @username)

    if !Current.user.authenticate(@password) then
      return result_error(code: 400, message: "账号或密码错误")
    end

    result_success(message: "登入成功", data: nil)
  end
end
