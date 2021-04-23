defmodule EventsAppWeb.InviteController do
  use EventsAppWeb, :controller

  alias EventsApp.Invites
  alias EventsApp.Invites.Invite
  alias EventsAppWeb.UserController

  action_fallback EventsAppWeb.FallbackController

  def index(conn, _params) do
    invites = Invites.list_invites()
    render(conn, "index.json", invites: invites)
  end

  def create(conn, %{"invite_params" => invite_params}) do
    {email, invite_params} = Map.pop(invite_params, "email")
    user = UserController.create_or_get(conn, email)
    invite_params = invite_params
                    |> Map.put("user_id", user.id)
                    |> Map.put("status", 0)
    case Invites.create_invite(invite_params) do
      {:ok, invite} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", Routes.invite_path(conn, :show, invite))
        |> render("show.json", invite: invite)

      {:error, %Ecto.Changeset{} = changeset} ->
        conn
        |> put_resp_header("content-type", "application/json; charset=UTF-8")
        |> send_resp(400, Jason.encode!(%{error: "User is already invited"}))
    end
  end

  def show(conn, %{"id" => id}) do
    invite = Invites.get_invite!(id)
    render(conn, "show.json", invite: invite)
  end

  def update(conn, %{"id" => id, "invite_params" => invite_params}) do
    invite = Invites.get_invite!(id)

    with {:ok, %Invite{} = invite} <- Invites.update_invite(invite, invite_params) do
      render(conn, "show.json", invite: invite)
    end
  end

  def delete(conn, %{"id" => id}) do
    invite = Invites.get_invite!(id)

    with {:ok, %Invite{}} <- Invites.delete_invite(invite) do
      send_resp(conn, :no_content, "")
    end
  end
end
