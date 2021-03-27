defmodule EventsAppWeb.PageController do
  use EventsAppWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
