"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";

export function AgentDeleteButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    setDeleting(true);
    setError("");
    const res = await fetch(`/api/admin/agents/${id}`, { method: "DELETE" });
    if (!res.ok) {
      setError((await res.json()).error ?? "Failed to delete");
      setDeleting(false);
      setConfirming(false);
      return;
    }
    router.refresh();
  }

  if (error) {
    return <p className="text-xs text-danger">{error}</p>;
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-moss">Delete &quot;{name}&quot;?</span>
        <Button type="button" size="sm" variant="outline" className="border-danger text-danger hover:bg-danger/10" disabled={deleting} onClick={handleDelete}>
          {deleting ? <Loader2 className="size-3.5 animate-spin" /> : "Confirm"}
        </Button>
        <Button type="button" size="sm" variant="ghost" onClick={() => setConfirming(false)}>Cancel</Button>
      </div>
    );
  }

  return (
    <Button type="button" size="sm" variant="ghost" className="text-danger hover:text-danger" onClick={() => setConfirming(true)}>
      <Trash2 className="size-3.5" />
      Delete
    </Button>
  );
}
