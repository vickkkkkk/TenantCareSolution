"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";

export function PropertyDeleteButton({ id, title }: { id: string; title: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    await fetch(`/api/admin/properties/${id}`, { method: "DELETE" });
    router.refresh();
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-moss">Delete &quot;{title}&quot;?</span>
        <Button type="button" size="sm" variant="outline" className="border-danger text-danger hover:bg-danger/10" disabled={deleting} onClick={handleDelete}>
          {deleting ? <Loader2 className="size-3.5 animate-spin" /> : "Confirm"}
        </Button>
        <Button type="button" size="sm" variant="ghost" onClick={() => setConfirming(false)}>Cancel</Button>
      </div>
    );
  }

  return (
    <Button type="button" size="sm" variant="ghost" onClick={() => setConfirming(true)}>
      <Trash2 className="size-3.5" />
    </Button>
  );
}
