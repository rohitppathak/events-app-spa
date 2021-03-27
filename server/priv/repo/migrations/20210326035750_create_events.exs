defmodule EventsApp.Repo.Migrations.CreateEvents do
  use Ecto.Migration

  def change do
    create table(:events) do
      add :body, :string, null: false
      add :title, :string, null: false
      add :date, :date, null: false
      add :user_id, references(:users), null: false

      timestamps()
    end

  end
end
