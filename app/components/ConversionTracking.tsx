"use client";

import { useEffect } from "react";

/**
 * Eventos de conversão para Meta e GA4.
 *
 * Sem isto o Pixel só manda PageView, e campanha de LEADS não tem o que
 * otimizar: a Meta precisa receber o evento de conversão para aprender
 * quem converte e montar público semelhante.
 *
 * Usa delegação no document em vez de editar os CTAs um por um. Os links
 * de WhatsApp estão espalhados em 15 arquivos e o chatbot ainda gera
 * outros em tempo de execução, então escutar no topo cobre todos, os de
 * hoje e os que vierem depois, sem risco de alguém esquecer de instrumentar
 * um botão novo.
 *
 * Mapa dos eventos:
 *   clique em WhatsApp  -> Meta "Contact" + GA4 "generate_lead" (method: whatsapp)
 *   envio de formulário -> Meta "Lead"    + GA4 "generate_lead" (method: formulario)
 *
 * "Contact" e "Lead" são eventos padrão da Meta, não personalizados. Isso
 * importa: só os padrão servem de objetivo de otimização e entram na
 * Agregação de Eventos.
 */

const LINK_WHATSAPP = /(?:wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)/i;

function paginaAtual() {
  return {
    pagina: window.location.pathname,
    titulo: document.title,
  };
}

export default function ConversionTracking() {
  useEffect(() => {
    function aoClicar(evento: MouseEvent) {
      const alvo = evento.target as HTMLElement | null;
      const link = alvo?.closest?.("a");
      if (!link) return;

      const destino = link.getAttribute("href") || "";
      if (!LINK_WHATSAPP.test(destino)) return;

      const { pagina, titulo } = paginaAtual();

      window.fbq?.("track", "Contact", {
        content_name: titulo,
        content_category: pagina,
      });

      window.gtag?.("event", "generate_lead", {
        method: "whatsapp",
        pagina,
        titulo,
      });
    }

    function aoEnviarFormulario() {
      const { pagina, titulo } = paginaAtual();

      window.fbq?.("track", "Lead", {
        content_name: titulo,
        content_category: pagina,
      });

      window.gtag?.("event", "generate_lead", {
        method: "formulario",
        pagina,
        titulo,
      });
    }

    // Captura na fase de captura para pegar o clique antes que algum
    // handler chame stopPropagation e o evento nunca chegue aqui.
    document.addEventListener("click", aoClicar, true);
    document.addEventListener("submit", aoEnviarFormulario, true);

    return () => {
      document.removeEventListener("click", aoClicar, true);
      document.removeEventListener("submit", aoEnviarFormulario, true);
    };
  }, []);

  return null;
}
