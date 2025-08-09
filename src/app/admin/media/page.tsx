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

export default function MediaAdminPage() {
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
    void load();
  }, []);

  async function handleDelete(key: string) {
    await fetch("/api/media", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keys: [key] }),
    });
    await load();
  }

  async function copy(text: string) {
    await navigator.clipboard.writeText(text);
  }

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ margin: 0, marginBottom: 16 }}>Admin · Media</h1>

      <div style={{ marginBottom: 16 }}>
        <UploadButton<OurFileRouter, "imageUploader">
          endpoint="imageUploader"
          onClientUploadComplete={() => void load()}
          onUploadError={(e) => alert(e.message)}
        />
      </div>

      {loading ? (
        <div>Loading…</div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 12,
          }}
        >
          {files.map((f) => (
            <div key={f.key} style={{ border: "1px solid #ddd", padding: 8, borderRadius: 6 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={f.url}
                alt={f.name ?? f.key}
                style={{ width: "100%", height: 150, objectFit: "cover", borderRadius: 4 }}
              />
              <div style={{ marginTop: 8, fontSize: 12, wordBreak: "break-all" }}>
                <div title={f.name ?? f.key}>
                  <strong>{f.name ?? f.key}</strong>
                </div>
                {f.size ? <div>{(f.size / 1024).toFixed(1)} KB</div> : null}
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <button onClick={() => void copy(f.url)}>Copy link</button>
                <button onClick={() => void handleDelete(f.key)} style={{ color: "#b00020" }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


