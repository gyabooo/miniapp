class PostsController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]
  before_action :set_post, only: [:show, :edit, :update, :destroy]
  before_action :redirect_index, only: [:edit, :update, :destroy]

  def index
    @posts = Post.order("created_at DESC")
  end

  # def show
  # end

  # def edit
  # end

  def update
    # @post = @post(create_params)
    # binding.pry
    if @post.update_attributes(create_params)
      # binding.pry
      redirect_to root_path, notice: '更新に成功しました'
    else
      # binding.pry
      flash.now[:alert] = '更新に失敗しました'
      render :edit
    end
  end

  def new
    @post = Post.new
  end

  def create
    @post = Post.new(create_params)
    # binding.pry
    if @post.save
      # binding.pry
      redirect_to root_path, notice: '投稿に成功しました'
    else
      # binding.pry
      flash.now[:alert] = '投稿に失敗しました'
      render :new
    end
  end

  def destroy
    if @post.destroy
      # binding.pry
      redirect_to root_path, notice: '記事の削除に成功しました'
    else
      # binding.pry
      flash.now[:alert] = '記事の削除に失敗しました'
      render :index
    end
  end

  private
  def create_params
    params.require('post').permit(:title, :text).merge(user_id: current_user.id)
  end

  def set_post
    @post = Post.find(params[:id])
  end

  def redirect_index
    redirect_to root_path unless current_user.id == @post.user_id
  end
end
