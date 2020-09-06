class DestroyCommentService < BaseService
  def validate
    article_id, comment_id = param[:article_id], param[:id]

    return result_error(code: 400, message: "参数错误") if comment_id.blank?
    return result_error(code: 400, message: "参数错误") if article_id.blank?

    comment = Comment.find_by!(id: comment_id, article_id: article_id)

    return result_error(code: 400, message: "评论不存在") if comment == nil

    if comment.user_id != Current.user.id then
      if !Current.user.is_admin then
        return result_error(code: 400, message: "这条评论不是你的，你没资格删")
      end
    end

    @comment = comment
    return nil
  end

  def execute
    @comment.destroy!

    result_success(message: "评论删除成功", data: nil)
  end
end
