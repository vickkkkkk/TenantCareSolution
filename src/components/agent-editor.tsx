"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AgentAvatar } from "@/components/agent-avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Upload, CheckCircle2, Save } from "lucide-react";

export function AgentEditor({
  agentId,
  name: initialName,
  jobTitle: initialJobTitle,
  bio: initialBio,
  photo,
}: {
  agentId: string;
  name: string;
  jobTitle: string | null;
  bio: string | null;
  photo: string | null;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentPhoto, setCurrentPhoto] = useState(photo);
  const [photoStatus, setPhotoStatus] = useState<"idle" | "uploading" | "done" | "error">("idle");
  const [photoError, setPhotoError] = useState("");

  const [name, setName] = useState(initialName);
  const [jobTitle, setJobTitle] = useState(initialJobTitle ?? "");
  const [bio, setBio] = useState(initialBio ?? "");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "done" | "error">("idle");
  const [saveError, setSaveError] = useState("");

  async function handleFile(file: File) {
    setPhotoStatus("uploading");
    setPhotoError("");
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
      setPhotoStatus("done");
    } catch (err) {
      setPhotoError(err instanceof Error ? err.message : "Something went wrong");
      setPhotoStatus("error");
    }
  }

  async function handleSave() {
    setSaveStatus("saving");
    setSaveError("");
    try {
      const res = await fetch(`/api/admin/agents/${agentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, jobTitle, bio }),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? "Failed to save");
      setSaveStatus("done");
      router.refresh();
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Something went wrong");
      setSaveStatus("error");
    }
  }

  return (
    <div className="rounded-lg border border-sand bg-white p-4 flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <AgentAvatar name={name} photo={currentPhoto} size={64} />
        <div className="flex-1">
          <p className="font-display">{name}</p>
          {jobTitle && <p className="text-xs text-moss">{jobTitle}</p>}
          {photoStatus === "error" && <p className="text-xs text-danger mt-1">{photoError}</p>}
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
          disabled={photoStatus === "uploading"}
          onClick={() => inputRef.current?.click()}
        >
          {photoStatus === "uploading" ? (
            <Loader2 className="size-4 animate-spin" />
          ) : photoStatus === "done" ? (
            <CheckCircle2 className="size-4 text-evergreen" />
          ) : (
            <Upload className="size-4" />
          )}
          {photoStatus === "done" ? "Uploaded" : currentPhoto ? "Replace" : "Upload"}
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 pt-3 border-t border-sand">
        <div>
          <Label htmlFor={`name-${agentId}`}>Name</Label>
          <Input id={`name-${agentId}`} value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor={`jobTitle-${agentId}`}>Job title</Label>
          <Input id={`jobTitle-${agentId}`} value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} className="mt-1.5" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor={`bio-${agentId}`}>Bio</Label>
          <Textarea id={`bio-${agentId}`} value={bio} onChange={(e) => setBio(e.target.value)} className="mt-1.5" rows={3} />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button type="button" size="sm" className="bg-evergreen hover:bg-moss" disabled={saveStatus === "saving"} onClick={handleSave}>
          {saveStatus === "saving" ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          Save details
        </Button>
        {saveStatus === "done" && <span className="text-xs text-evergreen">Saved</span>}
        {saveStatus === "error" && <span className="text-xs text-danger">{saveError}</span>}
      </div>
    </div>
  );
}
