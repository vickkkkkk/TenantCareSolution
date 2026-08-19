"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Plus } from "lucide-react";

export function NewAgentForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [bio, setBio] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    setError("");
    try {
      const res = await fetch("/api/admin/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, jobTitle, bio }),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? "Failed to create agent");
      setName("");
      setJobTitle("");
      setBio("");
      setStatus("idle");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-sand bg-white p-4 flex flex-col gap-3">
      <p className="font-display">Add a new agent</p>
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <Label htmlFor="new-agent-name">Name</Label>
          <Input id="new-agent-name" required value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="new-agent-title">Job title</Label>
          <Input id="new-agent-title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} className="mt-1.5" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="new-agent-bio">Bio</Label>
          <Textarea id="new-agent-bio" value={bio} onChange={(e) => setBio(e.target.value)} className="mt-1.5" rows={3} />
        </div>
      </div>
      {status === "error" && <p className="text-xs text-danger">{error}</p>}
      <Button type="submit" size="sm" className="w-fit bg-evergreen hover:bg-moss" disabled={status === "saving"}>
        {status === "saving" ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
        Add agent
      </Button>
    </form>
  );
}
