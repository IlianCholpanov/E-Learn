import React from "react";
import { Button } from "./ui/button";

type ActionButtonProps = {
  onAdd: () => void;
};

export default function ActionButton({ onAdd }: ActionButtonProps) {
  return (
    <div className="flex justify-end items-end gap-4 mb-6">
      <Button
        className="bg-primary hover:bg-primary/90 text-primary-foreground"
        onClick={onAdd}
      >
        ADD
      </Button>
    </div>
  );
}
