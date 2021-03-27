defmodule EventsAppWeb.SessionController do
  use EventsAppWeb, :controller

  def create(conn, %{"email" => email, "password" => password}) do
    user = EventsApp.Users.authenticate(email, password)
    if user do
      sess = %{
        user_id: user.id,
        email: user.email,
        name: user.name,
        token: Phoenix.Token.sign(conn, "user_id", user.id),
      }
      conn
      |> put_resp_header("content-type", "application/json; charset=UTF-8")
      |> send_resp(:created, Jason.encode!(sess))
    else
      conn
      |> put_resp_header(
           "content-type",
           "application/json; charset=UTF-8")
      |> send_resp(:unauthorized, Jason.encode!(%{error: "fail"}))
    end
  end
end
