class ApplicationController < ActionController::Base
  protect_ffrom_forgery with: :exception

  def hello
    render html: "hello, world!"
  end
end
