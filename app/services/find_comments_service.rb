class FindCommentsService < BaseService
  def validate
    article_id = param[:article_id]

    return render_error(code: 400, message: "参数错误") if article_id.blank?

    @article = Article.find(article_id)
    nil
  end

  def execute
    comments = @article.comments.order(created_at: :desc)

    users = {}
    comments.each do |comment|
      if !users[comment.user_id] then
        users[comment.user_id] = comment.user
        comment.user.password_digest = ""
      end
    end

    result_success(message: "获取成功", data: {
      comments: comments,
      users: users,
    })
  end
end
