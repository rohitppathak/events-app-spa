defmodule EventsApp.Users.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :email, :string
    field :name, :string
    field :password_hash, :string
    has_many :events, EventsApp.Events.Event
    has_many :invites, EventsApp.Invites.Invite

    timestamps()
  end

  @doc false
  def changeset(user, attrs, invite \\ false) do
    required = if invite do
      [:email, :password_hash]
    else
      [:name, :email, :password_hash]
    end
    user
    |> cast(attrs, [:name, :email, :password_hash])
    |> validate_required(required)
    |> unique_constraint(:email, name: :email_unique)
  end
end
