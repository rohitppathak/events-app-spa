defmodule EventsApp.Invites.Invite do
  use Ecto.Schema
  import Ecto.Changeset

  schema "invites" do
    field :comment, :string
    field :status, :integer

    belongs_to :event, EventsApp.Events.Event
    belongs_to :user, EventsApp.Users.User

    timestamps()
  end

  @doc false
  def changeset(invite, attrs) do
    invite
    |> cast(attrs, [:status, :event_id, :user_id, :comment])
    |> validate_required([:status, :event_id, :user_id])
    |> unique_constraint([:user_id, :event_id], name: :invite_unique)
  end
end
