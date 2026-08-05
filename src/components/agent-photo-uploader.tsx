"use client";

import { useRef, useState } from "react";
import { AgentAvatar } from "@/components/agent-avatar";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, CheckCircle2 } from "lucide-react";

export function AgentPhotoUploader({
  agentId,
  name,
  jobTitle,
  photo,
}: {
  agentId: string;
  name: string;
  jobTitle: string | null;
  photo: string | null;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentPhoto, setCurrentPhoto] = useState(photo);
  const [status, setStatus] = useState<"idle" | "uploading" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleFile(file: File) {
    setStatus("uploading");
    setErrorMsg("");
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("folder", "agents");
      const uploadRes = await fetch("/api/upload", { method: "POST", body: form });
      if (!uploadRes.ok) throw new Error((await uploadRes.json()).error ?? "Upload failed");
      const { url } = await uploadRes.json();

      const patchRes = await fetch(`/api/agents/${agentId}/photo`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ photo: url }),
      });
      if (!patchRes.ok) throw new Error("Saved the image but failed to update the agent record");

      setCurrentPhoto(url);
      setStatus("done");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  }

  return (
    <div className="rounded-lg border border-sand bg-white p-4 flex items-center gap-4">
      <AgentAvatar name={name} photo={currentPhoto} size={64} />
      <div className="flex-1">
        <p className="font-display">{name}</p>
        {jobTitle && <p className="text-xs text-moss">{jobTitle}</p>}
        {status === "error" && <p className="text-xs text-danger mt-1">{errorMsg}</p>}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={status === "uploading"}
        onClick={() => inputRef.current?.click()}
      >
        {status === "uploading" ? (
          <Loader2 className="size-4 animate-spin" />
        ) : status === "done" ? (
          <CheckCircle2 className="size-4 text-evergreen" />
        ) : (
          <Upload className="size-4" />
        )}
        {status === "done" ? "Uploaded" : currentPhoto ? "Replace" : "Upload"}
      </Button>
    </div>
  );
}
