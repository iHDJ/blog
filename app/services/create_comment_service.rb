class CreateCommentService < BaseService
  def validate
    content = param[:content]
    article_id = param[:article_id]
    reply_user_id = param[:reply_user_id]

    return result_error(code: 400, message: "参数错误") if content.blank?

    if article_id.blank? || Article.find_by(id: article_id) == nil
      return result_error(code: 400, message: "文章不存在")
    end

    if reply_user_id != nil
      if User.find_by(id: reply_user_id) == nil
        return result_error(code: 400, message: "用户不存在")
      end
    end

    @content = content
    @article_id = article_id
    @reply_user_id = reply_user_id
  end

  def execute
    Comment.create!(
      user_id: Current.user.id,
      article_id: @article_id,
      content: @content,
      reply_user_id: @reply_user_id,
    )

    result_success(message: "评论成功", data: nil)
  end
end
