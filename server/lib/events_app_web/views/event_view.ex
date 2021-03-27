defmodule EventsAppWeb.EventView do
  use EventsAppWeb, :view
  alias EventsAppWeb.EventView
  alias EventsAppWeb.UserView
  alias EventsAppWeb.InviteView
  alias EventsApp.Invites.Invite

  def render("index.json", %{events: events}) do
    %{data: render_many(events, EventView, "event.json")}
  end

  def render("show.json", %{event: event}) do
    %{data: render_one(event, EventView, "event.json")}
  end

  def render("event.json", %{event: event}) do
    %{id: event.id,
      body: event.body,
      title: event.title,
      date: event.date,
      owner:  render_one(event.user, UserView, "user.json"),
      invites: render_many(event.invites, InviteView, "invite_user.json")
    }
  end

  def render("event_invite.json", %{event: %Invite{event: event}}) do
    IO.inspect(event)
    render("event.json", %{event: event})
  end

end
