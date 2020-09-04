class Api::V1::ArticlesController < ApplicationController
  def index
    result = FindArticlesService.new(params).exec

    render_service_json(result)
  end

  def show
    result = FindArticleService.new(params).exec

    render_service_json(result)
  end

  def create
    admin_authorization!

    result = CreateArticleService.new(params).exec

    render_service_json(result)
  end

  def destroy
    admin_authorization!

    result = DestroyArticleService.new(params).exec

    render_service_json(result)
  end
end
