class FindArticleService < BaseService
  def execute
    article = Article.find(param[:id])
    tags = Tag.where(article_id: article.id).all

    data = {
      article: article,
      tags: tags,
    }

    result_success(message: "获取成功", data: data)
  end
end
