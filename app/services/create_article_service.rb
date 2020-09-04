class CreateArticleService < BaseService
  def validate
    title, content = param[:title], param[:content]

    return result_error(code: 400, message: "参数错误") if title.blank?
    return result_error(code: 400, message: "参数错误") if content.blank?

    @title, @content = title, content
    nil
  end

  def execute
    Article.create!(
      title: @title,
      content: @content,
    )

    result_success(message: "创建成功", data: nil)
  end
end
