"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Search } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { CustomLabel } from "@/components/custom-label";

interface ServerSearchProps {
  data: {
    label: string;
    type: "channel" | "member";
    data:
      | {
          icon: React.ReactNode;
          name: string;
          id: string;
        }[]
      | undefined;
  }[];
}

export const ServerSearch = ({ data }: ServerSearchProps) => {
  const [open, setOpen] = useState(false);
  const [labelText, setLabelText] = useState("CTRL + Y");
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    if (labelText === "CTRL + K") {
      setTimeout(() => {
        setLabelText("⌘ + K");
      }, 5000);
    } else {
      setTimeout(() => {
        setLabelText("CTRL + K");
      }, 5000);
    }
  }, [labelText]);

  useEffect(() => {
    const downK = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", downK);
    return () => document.removeEventListener("keydown", downK);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClick = ({
    id,
    type,
  }: {
    id: string;
    type: "channel" | "member";
  }) => {
    setOpen(false);
    if (type === "member") {
      return router.push(`/servers/${params?.serverId}/conversations/${id}`);
    }
    if (type === "channel") {
      return router.push(`/servers/${params?.serverId}/channels/${id}`);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group p-2 rounded-md flex items-center gap-x-2 w-full
        hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
      >
        <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
        <p
          className="font-semibold text-sm text-zinc-500 
        dark:text-zinc-400 group-hover:text-zinc-600
        dark:group-hover:text-zinc-300 transition"
        >
          Pesquisar
        </p>
        <CustomLabel labelText={labelText} />
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Procurar em todos os canais e membros" />
        <CommandList>
          <CommandEmpty>Sem resultados</CommandEmpty>
          {data.map(({ label, type, data }) => {
            if (!data?.length) return null;

            return (
              <CommandGroup key={label} heading={label}>
                {data?.map(({ id, icon, name }) => {
                  return (
                    <CommandItem
                      onSelect={() => onClick({ id, type })}
                      key={id}
                    >
                      {icon}
                      <span>{name}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </>
  );
};
