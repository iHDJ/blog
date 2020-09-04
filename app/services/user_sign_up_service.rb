class UserSignUpService < BaseService
  attr_reader :user

  def validate
    username, password = param[:username], param[:password]

    param_error = render_error(code: 400, message: "参数错误")
    return param_error if username.blank?
    return param_error if username.blank?

    @username, @password = username, password
    return nil
  end

  def execute
    @user = User.create!(
      username: username,
      password: password,
    )

    result_success(message: "注册成功", data: nil)
  end
end
