import { useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export function BackButton({ className = "" }: { className?: string }) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.history.back()}
      className={`inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-cyan hover:text-foreground ${className}`}
    >
      <ArrowLeft size={13} /> Volver
    </button>
  );
}
