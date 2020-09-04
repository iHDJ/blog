class Api::V1::CommentsController < ApplicationControler
  def create
    authorization!
  end

  def destroy
    authorization!

  end
end
