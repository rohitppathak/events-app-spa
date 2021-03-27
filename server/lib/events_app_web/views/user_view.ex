defmodule EventsAppWeb.UserView do
  use EventsAppWeb, :view
  alias EventsAppWeb.UserView
  alias EventsAppWeb.EventView
  alias EventsAppWeb.InviteView

  def render("index.json", %{users: users}) do
    %{data: render_many(users, UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "user_info.json")}
  end

  def render("user.json", %{user: user}) do
    %{id: user.id,
      name: user.name,
      email: user.email
    }
  end

  def render("user_info.json", %{user: user}) do
    %{
      id: user.id,
      name: user.name,
      email: user.email,
      invites: render_many(user.invites, InviteView, "invite_event.json"),
      events: render_many(user.events, EventView, "event.json")
    }
  end
end
