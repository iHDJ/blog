class Api::V1::CommentsController < ApplicationController
  def index
    result = FindCommentsService.new(params).exec

    render_service_json(result)
  end

  def create
    authorization!
    result = CreateCommentService.new(params).exec

    render_service_json(result)
  end

  def destroy
    authorization!
    result = DestroyCommentService.new(params).exec

    render_service_json(result)
  end
end
