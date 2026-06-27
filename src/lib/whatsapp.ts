// RJjstore — contato WhatsApp (sem backend)
// Para trocar o número, edite apenas as duas constantes abaixo.
export const WHATSAPP_NUMBER = "5533998779375"; // (33) 99877-9375
export const WHATSAPP_DISPLAY = "(33) 99877-9375";

export const STORE_NAME = "RJjstore";

export function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Mensagem para um único produto (página de produto / card) */
export function buyMessage(name: string, brand: string, size: string, price: string) {
  return `Olá! Tenho interesse nesta peça da ${STORE_NAME}:\n\n• ${name} — ${brand}\n• Tamanho: ${size}\n• Valor: ${price}\n\nAinda está disponível?`;
}

/** Mensagem do carrinho completo */
export function orderMessage(
  lines: { name: string; brand: string; size: string; qty: number; price: string }[],
  subtotal: string,
  total: string
) {
  const body = lines
    .map(
      (l) =>
        `• ${l.qty}x ${l.name} — ${l.brand} (tam. ${l.size}) — ${l.price}`
    )
    .join("\n");
  return `Olá! Gostaria de finalizar este pedido na ${STORE_NAME}.\n\n${body}\n\nSubtotal: ${subtotal}\n*Total: ${total}*\n\nPode confirmar disponibilidade e formas de pagamento?`;
}
