import { Mic, FileText, Link as LinkIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState } from "react";

interface NoteAttachmentsProps {
  noteId: string;
  userId: string | undefined;
}

export function NoteAttachments({ noteId, userId }: NoteAttachmentsProps) {
  const qc = useQueryClient();
  const [uploading, setUploading] = useState(false);

  const { data: attachments } = useQueryClient().getQueryState({
    queryKey: ["note-attachments", noteId],
  });

  const uploadAttachment = useMutation({
    mutationFn: async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !userId) throw new Error("No hay archivo o usuario");

      setUploading(true);
      const ext = file.name.split(".").pop() || "file";
      const filePath = `${userId}/${crypto.randomUUID()}.${ext}`;

      let attachmentType: "image" | "audio" | "pdf" | "link" = "image";
      if (file.type.startsWith("audio/")) attachmentType = "audio";
      else if (file.type === "application/pdf") attachmentType = "pdf";
      else if (file.type.startsWith("image/")) attachmentType = "image";

      const { error: uploadError } = await supabase.storage
        .from("media")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase.from("note_attachments").insert({
        note_id: noteId,
        user_id: userId,
        file_path: filePath,
        file_type: file.type,
        file_size: file.size,
        attachment_type: attachmentType,
      });

      if (dbError) throw dbError;

      return { type: attachmentType, path: filePath };
    },
    onSuccess: () => {
      toast.success("Archivo adjuntado");
      qc.invalidateQueries({ queryKey: ["note-attachments", noteId] });
      setUploading(false);
    },
    onError: (e: Error) => {
      toast.error(e.message);
      setUploading(false);
    },
  });

  const deleteAttachment = useMutation({
    mutationFn: async (attachmentId: string) => {
      const { error } = await supabase.from("note_attachments").delete().eq("id", attachmentId);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Archivo eliminado");
      qc.invalidateQueries({ queryKey: ["note-attachments", noteId] });
    },
  });

  const getIcon = (type: string) => {
    switch (type) {
      case "audio":
        return <Mic className="size-4" />;
      case "pdf":
        return <FileText className="size-4" />;
      case "link":
        return <LinkIcon className="size-4" />;
      default:
        return <FileText className="size-4" />;
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <label>
          <input
            type="file"
            accept="audio/*,application/pdf,image/*"
            className="hidden"
            onChange={(e) => uploadAttachment.mutate(e)}
            disabled={uploading}
          />
          <Button variant="outline" size="sm" className="rounded-full" asChild>
            <span>
              <Mic className="mr-1 size-4" />
              {uploading ? "Subiendo..." : "Adjuntar audio/PDF"}
            </span>
          </Button>
        </label>
      </div>
    </div>
  );
}
