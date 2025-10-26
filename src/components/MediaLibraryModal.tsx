"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "~/app/api/uploadthing/core";
import "@uploadthing/react/styles.css";
import s from "~/app/admin/admin.module.css";

type FileItem = {
  key: string;
  url: string;
  name?: string;
  size?: number;
  uploadedAt?: string;
};

// ---------- Safe type guards (no `any`, no unnecessary assertions) ----------
function isObject(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null;
}

function hasStringProp<T extends string>(
  obj: unknown,
  prop: T
): obj is Record<T, string> {
  if (!isObject(obj)) return false;
  return prop in obj && typeof obj[prop] === "string";
}

function hasOptionalStringProp<T extends string>(
  obj: unknown,
  prop: T
): obj is Record<T, string | undefined> {
  if (!isObject(obj)) return false;
  return !(prop in obj) || typeof obj[prop] === "string";
}

function hasOptionalNumberProp<T extends string>(
  obj: unknown,
  prop: T
): obj is Record<T, number | undefined> {
  if (!isObject(obj)) return false;
  return !(prop in obj) || typeof obj[prop] === "number";
}

function isFileItem(x: unknown): x is FileItem {
  return (
    isObject(x) &&
    hasStringProp(x, "key") &&
    hasStringProp(x, "url") &&
    hasOptionalStringProp(x, "name") &&
    hasOptionalNumberProp(x, "size") &&
    hasOptionalStringProp(x, "uploadedAt")
  );
}

function isFileItemArray(x: unknown): x is FileItem[] {
  return Array.isArray(x) && x.every(isFileItem);
}

function hasMessage(x: unknown): x is { message: string } {
  return hasStringProp(x, "message");
}
// ---------------------------------------------------------------------------

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
  const [mounted, setMounted] = useState(false); // for portals (Next.js/SSR)

  useEffect(() => setMounted(true), []);

  const lockVirtualScroll = (locked: boolean) => {
    try {
      window.dispatchEvent(
        new CustomEvent("virtualscroll:lock", { detail: { locked } })
      );
    } catch {
      // no-op
    }
  };

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/media");
      const json = (await res.json()) as unknown;
      if (isFileItemArray(json)) {
        setFiles(json);
      } else {
        console.error("Unexpected /api/media payload shape", json);
        setFiles([]);
      }
    } catch (e) {
      console.error("Failed to load media", e);
      setFiles([]);
    } finally {
      setLoading(false);
    }
  }

  // Open/close effects: load data & lock/unlock virtual scroll
  useEffect(() => {
    if (open) {
      lockVirtualScroll(true);
      void load();
    } else {
      lockVirtualScroll(false);
    }
    return () => {
      // safety net: make sure we unlock on unmount/prop flip
      lockVirtualScroll(false);
    };
  }, [open]);

  async function handleDelete(key: string) {
    try {
      if (!window.confirm("Delete this file? This cannot be undone.")) return;
      await fetch("/api/media", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keys: [key] }),
      });
    } catch (e) {
      console.error("Delete failed", e);
    } finally {
      await load();
    }
  }

  if (!open || !mounted) return null;

  const modal = (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000000000000,
        height: "100vh",
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Media library"
    >
      <div
        style={{
          background: "#fff",
          width: 900,
          maxWidth: "95vw",
          padding: 16,
          borderRadius: 8,
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          maxHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 4,
          }}
        >
          <strong>Media library</strong>
          <button
            onClick={onClose}
            className={`${s.btn} ${s.btnSm}`}
            title="Close"
          >
            ✕
          </button>
        </div>

        <div style={{ marginBottom: 4 }}>
          <UploadButton<OurFileRouter, "imageUploader">
            endpoint="imageUploader"
            onClientUploadComplete={() => void load()}
            onUploadError={(err: unknown) => {
              let message = "Upload failed";
              if (err instanceof Error) {
                message = err.message;
              } else if (typeof err === "string") {
                message = err;
              } else if (hasMessage(err)) {
                message = err.message;
              }
              window.alert(message);
            }}
          />
        </div>

        {loading ? (
          <div>Loading…</div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              gap: 14,
              maxHeight: "60vh",
              overflow: "auto",
            }}
          >
            {files.map((m) => (
              <div key={m.key} className={s.card} style={{ padding: 10 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={m.url}
                  alt={m.name ?? m.key}
                  style={{
                    width: "100%",
                    height: 140,
                    objectFit: "cover",
                    borderRadius: 6,
                  }}
                />
                <div
                  style={{
                    fontSize: 12,
                    marginTop: 8,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {m.name ?? m.key}
                </div>
                <div className={s.actions3} style={{ marginTop: 8 }}>
                  <button
                    onClick={() => onSelect(m.url)}
                    className={`${s.btn} ${s.btnPrimary} ${s.btnSm} ${s.btnBlock}`}
                    title="Select"
                  >
                    ✔ Select
                  </button>
                  <button
                    onClick={() => {
                      void navigator.clipboard.writeText(m.url);
                    }}
                    className={`${s.btn} ${s.btnSm} ${s.btnBlock}`}
                    title="Copy link"
                  >
                    📋 Copy
                  </button>
                  <button
                    onClick={() => {
                      void handleDelete(m.key);
                    }}
                    className={`${s.btn} ${s.btnDanger} ${s.btnSm} ${s.btnBlock}`}
                    title="Delete"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // Portal to <body> so fixed positioning is relative to the viewport
  return createPortal(modal, document.body);
}
