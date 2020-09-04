class FindArticlesService < BaseService

  def validate
    validate_page
  end

  def execute
    offest = (@page - 1) * @page_size
    articles = Article.limit(@page_size).offset(offest).order(:updated_at).all

    result_success(message: "获取成功", data: articles)
  end

  private

  def validate_page
    @page, @page_size = param.values_at(:page, :page_size)

    @page = 1 if @page == nil || @page <= 0
    @page_size = 25 if @page_size == nil || @page_size <= 0
    return nil
  end
end
