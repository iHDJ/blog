class FrontendController < ApplicationController
  def show
    response = open('http://web.blog.docker:8000').read

    render data: response
  end
end