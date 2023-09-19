"use client";

import { Plus } from "lucide-react";

import { ActionTooltip } from "@/components/action-tooltip";
import { useEffect, useState } from "react";
import { useModal } from "@/hooks/use-modal-store";
import { CustomLabel } from "@/components/custom-label";

export const NavigationAction = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { onOpen } = useModal();
  const [labelText, setLabelText] = useState("CTRL + Y");

  useEffect(() => {
    if (labelText === "CTRL + Y") {
      setTimeout(() => {
        setLabelText("⌘ + Y");
      }, 5000);
    } else {
      setTimeout(() => {
        setLabelText("CTRL + Y");
      }, 5000);
    }
  }, [labelText]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "y" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpen("appCreator");
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div>
      <div className="mb-3 flex justify-center">
        <ActionTooltip side="right" align="center" label="Informações">
          <button onClick={() => onOpen("appCreator")}>
            <CustomLabel labelText={labelText} sidebar />
          </button>
        </ActionTooltip>
      </div>
      <ActionTooltip side="right" align="center" label="Adicionar um servidor">
        <button
          onClick={() => onOpen("createServer")}
          className="group flex items-center"
        >
          <div
            className="flex mx-3 h-[48px] w-[48px] rounded-[24px] 
            group-hover:rounded-[16px] transition-all overflow-hidden 
            items-center justify-center bg-background dark:bg-neutral-700 
            group-hover:bg-emerald-500"
          >
            <Plus
              className="group-hover:text-white transition text-emerald-500"
              size={25}
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};
