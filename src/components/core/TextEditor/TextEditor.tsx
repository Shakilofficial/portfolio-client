/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  ImageIcon,
  Italic,
  LinkIcon,
  List,
  ListOrdered,
  Quote,
  Redo,
  Undo,
  Unlink,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Control, useController } from "react-hook-form";

interface TextEditorProps {
  name: string;
  label?: string;
  description?: string;
  placeholder?: string;
  control: Control<any>;
  className?: string;
  error?: string;
  defaultValue?: string;
}

const MenuButton = ({
  onClick,
  isActive = false,
  disabled = false,
  tooltip,
  children,
}: {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  tooltip: string;
  children: React.ReactNode;
}) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant={isActive ? "default" : "ghost"}
          size="icon"
          className={cn(
            "h-8 w-8",
            isActive && "bg-primary text-primary-foreground"
          )}
          onClick={onClick}
          disabled={disabled}
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">{tooltip}</TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const TextEditor = ({
  name,
  label,
  description,
  placeholder = "Write something...",
  control,
  className,
  error,
  defaultValue = "",
}: TextEditorProps) => {
  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
    defaultValue,
  });

  const [linkUrl, setLinkUrl] = useState("");
  const [linkOpen, setLinkOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageOpen, setImageOpen] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
      Image.configure({
        allowBase64: true,
        inline: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: value || defaultValue,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value === "") {
      editor.commands.setContent("");
    }
  }, [editor, value]);

  const addLink = useCallback(() => {
    if (!editor) return;

    if (linkUrl) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: linkUrl })
        .run();

      setLinkUrl("");
      setLinkOpen(false);
    }
  }, [editor, linkUrl]);

  const removeLink = useCallback(() => {
    if (!editor) return;

    editor.chain().focus().extendMarkRange("link").unsetLink().run();
  }, [editor]);

  const addImage = useCallback(() => {
    if (!editor) return;

    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl("");
      setImageOpen(false);
    }
  }, [editor, imageUrl]);

  if (!editor) {
    return null;
  }

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <div className="flex justify-between">
          <Label
            htmlFor={name}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </Label>
        </div>
      )}

      <div className="rounded-md border border-input bg-background">
        <div className="flex flex-wrap gap-1 p-1 border-b">
          <MenuButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive("bold")}
            tooltip="Bold"
          >
            <Bold className="h-4 w-4" />
          </MenuButton>

          <MenuButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive("italic")}
            tooltip="Italic"
          >
            <Italic className="h-4 w-4" />
          </MenuButton>

          <MenuButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            isActive={editor.isActive("heading", { level: 1 })}
            tooltip="Heading 1"
          >
            <Heading1 className="h-4 w-4" />
          </MenuButton>

          <MenuButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            isActive={editor.isActive("heading", { level: 2 })}
            tooltip="Heading 2"
          >
            <Heading2 className="h-4 w-4" />
          </MenuButton>

          <MenuButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            isActive={editor.isActive("heading", { level: 3 })}
            tooltip="Heading 3"
          >
            <Heading3 className="h-4 w-4" />
          </MenuButton>

          <MenuButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive("bulletList")}
            tooltip="Bullet List"
          >
            <List className="h-4 w-4" />
          </MenuButton>

          <MenuButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive("orderedList")}
            tooltip="Ordered List"
          >
            <ListOrdered className="h-4 w-4" />
          </MenuButton>

          <MenuButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            isActive={editor.isActive("codeBlock")}
            tooltip="Code Block"
          >
            <Code className="h-4 w-4" />
          </MenuButton>

          <MenuButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive("blockquote")}
            tooltip="Quote"
          >
            <Quote className="h-4 w-4" />
          </MenuButton>

          <div className="h-8 w-px bg-border mx-1" />

          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            isActive={editor.isActive({ textAlign: "left" })}
            tooltip="Align Left"
          >
            <AlignLeft className="h-4 w-4" />
          </MenuButton>

          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            isActive={editor.isActive({ textAlign: "center" })}
            tooltip="Align Center"
          >
            <AlignCenter className="h-4 w-4" />
          </MenuButton>

          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            isActive={editor.isActive({ textAlign: "right" })}
            tooltip="Align Right"
          >
            <AlignRight className="h-4 w-4" />
          </MenuButton>

          <div className="h-8 w-px bg-border mx-1" />

          <Popover open={linkOpen} onOpenChange={setLinkOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant={editor.isActive("link") ? "default" : "ghost"}
                size="icon"
                className={cn(
                  "h-8 w-8",
                  editor.isActive("link") &&
                    "bg-primary text-primary-foreground"
                )}
              >
                <LinkIcon className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="flex flex-col gap-2">
                <Label htmlFor="link-url">Link URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="link-url"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="flex-1"
                  />
                  <Button type="button" size="sm" onClick={addLink}>
                    Add
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {editor.isActive("link") && (
            <MenuButton onClick={removeLink} tooltip="Remove Link">
              <Unlink className="h-4 w-4" />
            </MenuButton>
          )}

          <Popover open={imageOpen} onOpenChange={setImageOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8"
              >
                <ImageIcon className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="flex flex-col gap-2">
                <Label htmlFor="image-url">Image URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="image-url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="flex-1"
                  />
                  <Button type="button" size="sm" onClick={addImage}>
                    Add
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <div className="h-8 w-px bg-border mx-1" />

          <MenuButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            tooltip="Undo"
          >
            <Undo className="h-4 w-4" />
          </MenuButton>

          <MenuButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            tooltip="Redo"
          >
            <Redo className="h-4 w-4" />
          </MenuButton>
        </div>

        <EditorContent
          editor={editor}
          className="prose prose-sm dark:prose-invert max-w-none p-4 focus:outline-none"
        />
      </div>

      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};

export { TextEditor };
