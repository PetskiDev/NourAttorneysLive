"use client";

import { useEffect, useState } from "react";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "~/app/api/uploadthing/core";
import "@uploadthing/react/styles.css";

type FileItem = {
  key: string;
  url: string;
  name?: string;
  size?: number;
  uploadedAt?: string;
};

export default function MediaLibraryModal({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}) {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/media");
      const json: unknown = await res.json();
      const data = json as FileItem[];
      setFiles(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (open) void load();
  }, [open]);

  async function handleDelete(key: string) {
    await fetch("/api/media", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keys: [key] }),
    });
    await load();
  }

  if (!open) return null;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
      <div style={{ background: "#fff", width: 900, maxWidth: "95vw", padding: 16, borderRadius: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <strong>Media library</strong>
          <button onClick={onClose}>Close</button>
        </div>

        <div style={{ marginBottom: 12 }}>
          <UploadButton<OurFileRouter, "imageUploader">
            endpoint="imageUploader"
            onClientUploadComplete={() => void load()}
            onUploadError={(e) => alert(e.message)}
          />
        </div>

        {loading ? (
          <div>Loading…</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 12, maxHeight: "60vh", overflow: "auto" }}>
            {files.map((m) => (
              <div key={m.key} style={{ border: "1px solid #ddd", padding: 8, borderRadius: 6 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.url} alt={m.name ?? m.key} style={{ width: "100%", height: 100, objectFit: "cover", borderRadius: 4 }} />
                <div style={{ fontSize: 12, marginTop: 6, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {m.name ?? m.key}
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                  <button onClick={() => onSelect(m.url)}>Select</button>
                  <button onClick={() => void navigator.clipboard.writeText(m.url)}>Copy link</button>
                  <button onClick={() => void handleDelete(m.key)} style={{ color: "#b00020" }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


