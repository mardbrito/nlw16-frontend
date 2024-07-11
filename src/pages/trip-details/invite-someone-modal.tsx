import { AtSign, Plus, X } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { FormEvent } from "react";
import { api } from "../../lib/axios";

interface InviteSomeoneModalProps {
  closeInviteSomeoneModal: () => void;
}

export function InviteSomeoneModal({
  closeInviteSomeoneModal,
}: InviteSomeoneModalProps) {
  const { tripId } = useParams();

  async function createNewInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString();

    await api.post(`/trips/${tripId}/invites`, {
      email,
    });

    // closeCreateActivityModal();
    window.document.location.reload();
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Convidar amigo</h2>
            <button type="button" onClick={closeInviteSomeoneModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            O convidado irá receber e-mail para confirmar a participação na
            viagem.
          </p>
        </div>

        {/* <div className="flex flex-wrap gap-2">
        {emailsToInvite.map((email) => (
          <div
            key={email}
            className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2"
          >
            <span className="text-zinc-300">{email}</span>
            <button
              type="button"
              onClick={() => removeEmailFromInvites(email)}
            >
              <X className="size-4 text-zinc-400" />
            </button>
          </div>
        ))}
      </div> */}

        <div className="w-full h-px bg-zinc-800"></div>

        <form
          onSubmit={createNewInvite}
          className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2"
        >
          <div className="px-2 flex flex-1 items-center gap-2">
            <AtSign className="size-5 text-zinc-400" />
            <input
              type="email"
              name="email"
              placeholder="Digite o e-mail do convidado"
              className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none flex-1"
            />
          </div>

          <Button variant="primary" size="default" type="submit">
            Convidar
            <Plus className="size-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
