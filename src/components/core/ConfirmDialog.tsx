"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onConfirm: () => Promise<void>;
  title: string;
  description: string;
  confirmButtonText: string;
}

const ConfirmDialog: React.FC<ModalProps> = ({
  isOpen,
  onOpenChange,
  onConfirm,
  title,
  description,
  confirmButtonText,
}) => {
  const handleConfirm = async () => {
    await onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[360px] md:max-w-md rounded-lg border-2 border-primary/50 bg-background/50 backdrop-blur-lg">
        <DialogHeader>
          <DialogTitle className="text-orange">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-between gap-2">
          <Button
            size={"sm"}
            variant="outline"
            className="text-xs"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            size={"sm"}
            className="text-xs"
            variant="destructive"
            onClick={handleConfirm}
          >
            {confirmButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
