# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     EventsApp.Repo.insert!(%EventsApp.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias EventsApp.Repo
alias EventsApp.Users.User
alias EventsApp.Events.Event
alias EventsApp.Invites.Invite

defmodule Inject do

  def user(name, pass, email) do
    hash = Argon2.hash_pwd_salt(pass)
    IO.inspect(hash)
    Repo.insert!(%User{name: name, password_hash: hash, email: email})
  end
end

{:ok, date} = Date.from_iso8601("2020-01-01")

alice = Inject.user("alice", "test1", "alice@finna.com")
bob = Inject.user("bob", "test2", "bob@finna.com")
event1 = Repo.insert!(%Event{title: "Event1", "body": "Have fun", "user_id": alice.id, "date": date})
event2 = Repo.insert!(%Event{title: "Event2", "body": "Have fun2", "user_id": bob.id, "date": date})
invite1 = Repo.insert!(%Invite{comment: "Will be there", status: 3, event_id: event1.id, user_id: bob.id})
