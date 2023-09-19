"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";

import { CheckIcon, Github, Linkedin, Mail } from "lucide-react";
import { ActionTooltip } from "@/components/action-tooltip";
import { useState } from "react";
import { UserAvatar } from "@/components/user-avatar";

export const AppCreatorModal = () => {
  const { isOpen, onClose, type } = useModal();
  const [copied, setCopied] = useState(false);

  const isModalOpen = isOpen && type === "appCreator";

  const handleClose = () => {
    onClose();
  };

  const onCopy = () => {
    navigator.clipboard.writeText("lalvesevangelista@gmail.com");
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 5000);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Olá caro(a) visitante!
          </DialogTitle>
        </DialogHeader>

        <DialogDescription className="px-10 text-center text-zinc-500">
          <div className="flex items-center justify-center my-2">
            <UserAvatar
              src="https://avatars.githubusercontent.com/u/67932981?v=4"
              className="h-[70px] w-[70px] md:w-[108px] md:h-[108px]"
            />
          </div>
          Meu nome é Leandro e sou um desenvolvedor front-end, responsável pelo
          desenvolvimento desta aplicação.
          <br />
          Este foi meu primeiro projeto full-stack, após quase 3 anos de
          experiência apenas com front-end em React. Não consigo expressar o
          quão orgulhoso eu estou pelo desenvolvimento desta aplicação,
          aprendendo tanta coisa nova, conhecendo novas tecnologias... Devo
          agradecer tudo isso à esta vídeo aula sensacional do canal{" "}
          <a
            href="https://www.youtube.com/watch?v=ZbX4Ok9YX94"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-indigo-600 decoration-none hover:text-indigo-400 transition"
          >
            Code With Antonio
          </a>
        </DialogDescription>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <ActionTooltip
              side="top"
              align="start"
              label="Confira mais projetos"
            >
              <a
                href="https://github.com/Default-nick"
                target="_blank"
                rel="noreferrer"
              >
                <Button variant="primary" size="lg">
                  <Github />
                </Button>
              </a>
            </ActionTooltip>
            <ActionTooltip
              side="top"
              align="center"
              label={copied ? "E-mail copiado!" : "Copiar e-mail"}
            >
              <Button
                variant="primary"
                size="lg"
                className={`transition ${
                  copied && "bg-lime-600 hover:bg-lime-800"
                }`}
                onClick={onCopy}
              >
                {copied ? <CheckIcon /> : <Mail />}
              </Button>
            </ActionTooltip>
            <ActionTooltip side="top" align="end" label="Contato profissional">
              <a
                href="https://www.linkedin.com/in/le-alves/"
                target="_blank"
                rel="noreferrer"
              >
                <Button variant="primary" size="lg">
                  <Linkedin />
                </Button>
              </a>
            </ActionTooltip>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
