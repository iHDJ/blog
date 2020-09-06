class UserSignUpService < BaseService
  def validate
    username, password = param[:username], param[:password]

    param_error = result_error(code: 400, message: "参数错误")
    return param_error if username.blank? || username.size < 3
    return param_error if password.blank? || password.size < 6

    if User.exists?(name: username.strip) then
      return result_error(code: 400, message: "用户已存在")
    end

    @username, @password = username.strip, password.strip
    return nil
  end

  def execute
    Current.user = User.create!(
      name: @username,
      password: @password,
    )

    result_success(message: "注册成功", data: nil)
  end
end
