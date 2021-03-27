defmodule EventsAppWeb.InviteView do
  use EventsAppWeb, :view
  alias EventsAppWeb.InviteView
  alias EventsAppWeb.UserView
  alias EventsAppWeb.EventView

  def render("index.json", %{invites: invites}) do
    %{data: render_many(invites, InviteView, "invite.json")}
  end

  def render("show.json", %{invite: invite}) do
    %{data: render_one(invite, InviteView, "invite.json")}
  end

  def render("invite.json", %{invite: invite}) do
    %{id: invite.id,
      status: invite.status,
      comment: invite.comment}
  end

  def render("invite_user.json", %{invite: invite}) do
    %{id: invite.id,
      status: invite.status,
      comment: invite.comment,
      user: render_one(invite.user, UserView, "user.json"),
    }
  end

  def render("invite_event.json", %{invite: invite}) do
    render_one(invite.event, EventView, "event.json")
  end
end
