class BaseService

  def initialize(param)
    @param = param
  end

  def validate; end

  def exec
    res = validate

    if res != nil then
      return res
    end

    execute
  end

  def param
    @param
  end

  def result_error(code:, message:)
    {
      success: false,
      code: code,
      message: message,
    }
  end

  def result_success(message:, data:)
    {
      success: true,
      message: message,
      data: data,
    }
  end
end
