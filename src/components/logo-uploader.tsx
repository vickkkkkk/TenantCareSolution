"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, CheckCircle2 } from "lucide-react";

export function LogoUploader({ currentLogoUrl }: { currentLogoUrl: string | null }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState(currentLogoUrl);
  const [status, setStatus] = useState<"idle" | "uploading" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleFile(file: File) {
    setStatus("uploading");
    setErrorMsg("");
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/branding/logo", { method: "POST", body: form });
      if (!res.ok) throw new Error((await res.json()).error ?? "Upload failed");
      const { logoUrl } = await res.json();
      setPreview(`${logoUrl}?v=${Date.now()}`);
      setStatus("done");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  }

  return (
    <div className="rounded-lg border border-sand bg-white p-6 flex flex-col gap-5 max-w-md">
      <div>
        <p className="font-display text-lg">Site logo</p>
        <p className="text-sm text-moss">Shown in the header. PNG with a transparent background works best.</p>
      </div>

      <div className="flex items-center justify-center h-24 rounded-md border border-dashed border-sand bg-bone">
        {preview ? (
          <div className="relative h-16 w-48">
            <Image src={preview} alt="Current logo" fill className="object-contain" unoptimized />
          </div>
        ) : (
          <span className="text-xs text-moss">No logo uploaded yet</span>
        )}
      </div>

      {status === "error" && <p className="text-xs text-danger">{errorMsg}</p>}

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
        disabled={status === "uploading"}
        onClick={() => inputRef.current?.click()}
        className="w-fit"
      >
        {status === "uploading" ? (
          <Loader2 className="size-4 animate-spin" />
        ) : status === "done" ? (
          <CheckCircle2 className="size-4 text-evergreen" />
        ) : (
          <Upload className="size-4" />
        )}
        {status === "done" ? "Uploaded — refresh site to see it" : preview ? "Replace logo" : "Upload logo"}
      </Button>
    </div>
  );
}
