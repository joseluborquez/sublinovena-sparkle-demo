import { waLink } from "@/lib/site-config";
import { WhatsappIcon } from "./WhatsappIcon";

export function WhatsappFab() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-6 right-5 z-[70] grid size-14 place-items-center rounded-full bg-leaf text-white shadow-[0_16px_40px_-12px_rgba(76,170,94,0.7)] transition-transform duration-300 hover:scale-110"
    >
      <WhatsappIcon className="size-7" />
    </a>
  );
}
