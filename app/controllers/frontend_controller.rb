class FrontendController < ApplicationController
  def show
    #todo csrf token
    res = open('http://web.blog.docker:8000').read

    render :html => res.html_safe, layout: false
  end
end