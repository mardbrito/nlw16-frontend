import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { InviteSomeoneModal } from "./invite-someone-modal";

interface Participant {
  id: string;
  name: string | null;
  email: string;
  is_confirmed: boolean;
}

export function Guests() {
  const { tripId } = useParams();
  const [participants, setParticipants] = useState<Participant[] | undefined>();
  const [isInviteSomeoneModalOpen, setIsInviteSomeoneModalOpen] =
    useState(false);

  function openInviteSomeoneModal() {
    setIsInviteSomeoneModalOpen(true);
  }

  function closeInviteSomeoneModal() {
    setIsInviteSomeoneModalOpen(false);
  }

  useEffect(() => {
    api
      .get(`/trips/${tripId}/participants`)
      .then((response) => setParticipants(response.data.participants));
  }, [tripId]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Convidados</h2>
      <div className="space-y-5">
        {participants?.map((participant, index) => (
          <div
            key={participant.id}
            className="flex items-center justify-between"
          >
            <div className="space-y-1.5">
              <span className="block font-medium text-zinc-100">
                {participant.name ?? `Convidado ${index}`}
              </span>
              <span className="block text-sm text-zinc-400 truncate">
                {participant.email}
              </span>
            </div>
            {participant.is_confirmed ? (
              <CheckCircle2 className="size-5 text-lime-400 shrink-0" />
            ) : (
              <CircleDashed className="size-5 text-zinc-400 shrink-0" />
            )}
          </div>
        ))}
      </div>

      <Button
        type="button"
        onClick={openInviteSomeoneModal}
        variant="secondary"
        size="full"
      >
        <UserCog className="size-5" />
        Gerenciar convidados
      </Button>

      {isInviteSomeoneModalOpen && (
        <InviteSomeoneModal closeInviteSomeoneModal={closeInviteSomeoneModal} />
      )}
    </div>
  );
}
