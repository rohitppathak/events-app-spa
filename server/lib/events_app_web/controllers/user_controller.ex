defmodule EventsAppWeb.UserController do
  use EventsAppWeb, :controller

  alias EventsApp.Users
  alias EventsApp.Users.User

  action_fallback EventsAppWeb.FallbackController

  def index(conn, _params) do
    users = Users.list_users()
    render(conn, "index.json", users: users)
  end

  def create(conn, %{"user" => user_params}) do
    with {:ok, %User{} = user} <- Users.create_user(user_params) do
      user = Users.load_user_info(user)
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.user_path(conn, :show, user))
      |> render("show.json", user: user)
    end
  end

  def create_or_get(conn, email) do
    user = Users.get_user_by_email(email)
    if user do
      user
    else
      case Users.create_user(%{"email": email, "name": "", "password_hash": "password"}, true) do
        {:ok, new_user} ->
          new_user

        {:error, %Ecto.Changeset{} = changeset} ->
          {:error, "Could not create user"}
      end
    end
  end

  def show(conn, %{"id" => id}) do
    user = Users.get_user!(id)
    |> Users.load_user_info
    render(conn, "show.json", user: user)
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Users.get_user!(id)

    with {:ok, %User{} = user} <- Users.update_user(user, user_params) do
      user = user |> Users.load_user_info
      render(conn, "show.json", user: user)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Users.get_user!(id)

    with {:ok, %User{}} <- Users.delete_user(user) do
      send_resp(conn, :no_content, "")
    end
  end
end
