class DestroyArticleService < BaseService
  def execute
    Article.find(param[:id]).destroy

    result_success(message: "删除成功", data: nil)
  end
end
