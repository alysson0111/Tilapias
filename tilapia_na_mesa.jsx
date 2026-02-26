import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export default function SiteVendaTilapias() {
  const [quantidades, setQuantidades] = React.useState<Record<string, number>>({});

  const WHATSAPP_NUMERO = "5579998485516";

  const produtos = [
    { nome: "Tilápia Inteira (Atacado)", descricao: "Pedido mínimo de 50kg • Com vísceras e escamas", preco: 16, minimo: 50 },
    { nome: "Tilápia Fresca (Inteira)", descricao: "Pedido mínimo de 2kg • Limpa e pronta para preparo", preco: 19, minimo: 2 },
    { nome: "Filé de Tilápia Premium", descricao: "Pedido mínimo de 2kg • Sem espinhas • Embalado a vácuo", preco: 45, minimo: 2 }
  ];

  const alterarQuantidade = (nome: string, valor: string) => {
    setQuantidades((prev) => ({ ...prev, [nome]: Number(valor) }));
  };

  const calcularTotal = (produto: { nome: string; preco: number }) => {
    const qtd = quantidades[produto.nome] || 0;
    let total = qtd * produto.preco;

    if (produto.nome === "Tilápia Fresca (Inteira)" && qtd >= 10) {
      total = total * 0.9;
    }

    return total;
  };

  const gerarMensagemWhatsApp = (produto: { nome: string }, qtd: number, total: number) => {
    return encodeURIComponent(
      `Olá! 👋\n\nGostaria de fazer o seguinte pedido:\n\n📦 Produto: ${produto.nome}\n⚖️ Quantidade: ${qtd}kg\n💰 Total: R$ ${total.toFixed(2)}\n\nAguardo informações para pagamento.`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-emerald-950 text-white">
      <header className="backdrop-blur-xl bg-white/5 border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <img src="/logo-tilapia.jpg" alt="Logo Tilápia na Mesa" className="h-12 w-auto rounded-xl" />
            <span className="text-lg font-semibold tracking-wide">Tilápia na Mesa</span>
          </div>

          <a href={`https://wa.me/${WHATSAPP_NUMERO}`} target="_blank">
            <Button className="rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold shadow-xl">
              <ShoppingCart className="w-4 h-4 mr-2" /> WhatsApp
            </Button>
          </a>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-28 text-center">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight bg-gradient-to-r from-emerald-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Experiência Premium em Tilápias Frescas
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Seleção rigorosa, frescor garantido e qualidade superior direto do viveiro para sua mesa ou negócio.
          </p>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-28">
        <h2 className="text-4xl font-bold mb-16 text-center">
          Linha de Produtos
        </h2>

        <div className="grid md:grid-cols-3 gap-12">
          {produtos.map((produto, index) => {
            const qtd = quantidades[produto.nome] || 0;
            const total = calcularTotal(produto);
            const pedidoMinimoValido = qtd >= produto.minimo;
            const descontoAtivo = produto.nome === "Tilápia Fresca (Inteira)" && qtd >= 10;
            const precoOriginal = qtd * produto.preco;

            return (
              <motion.div key={index} whileHover={{ y: -12 }} transition={{ type: "spring", stiffness: 150 }}>
                <Card className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl relative overflow-hidden">
                  <CardContent className="p-10">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-emerald-300">
                        {produto.nome}
                      </h3>

                      {produto.nome.includes("Atacado") && (
                        <span className="text-xs font-bold tracking-widest bg-amber-400 text-black px-3 py-1 rounded-full shadow-lg">
                          EXCLUSIVO ATACADO
                        </span>
                      )}

                      {produto.nome === "Tilápia Fresca (Inteira)" && (
                        <span className="text-xs font-bold tracking-widest bg-emerald-400 text-black px-3 py-1 rounded-full shadow-lg animate-pulse">
                          10% OFF ACIMA DE 10KG
                        </span>
                      )}
                    </div>

                    <p className="text-slate-300 mb-6 leading-relaxed">
                      {produto.descricao}
                    </p>

                    {produto.nome === "Tilápia Fresca (Inteira)" && (
                      <div className="mb-6 bg-emerald-400/10 border border-emerald-400/30 rounded-2xl p-4">
                        <p className="text-emerald-300 font-semibold text-sm tracking-wide">
                          💎 DESCONTO PREMIUM
                        </p>
                        <p className="text-slate-300 text-sm">
                          Comprando acima de 10kg você recebe 10% de desconto automático para pagamento à vista.
                        </p>
                      </div>
                    )}

                    <div className="mb-8">
                      <span className="text-4xl font-extrabold text-white">R$ {produto.preco}</span>
                      <span className="text-slate-400 ml-2">/kg</span>
                    </div>

                    <input
                      type="number"
                      min="0"
                      placeholder="Quantidade (kg)"
                      className="w-full bg-white/10 border border-white/20 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30 outline-none rounded-2xl p-4 mb-6 text-white placeholder:text-slate-400"
                      onChange={(e) => alterarQuantidade(produto.nome, e.target.value)}
                    />

                    {total > 0 && (
                      <div className="space-y-5">
                        {!pedidoMinimoValido && (
                          <p className="text-red-400 font-medium">
                            Pedido mínimo: {produto.minimo}kg
                          </p>
                        )}

                        {pedidoMinimoValido && (
                          <>
                            <div className="bg-white/10 border border-white/10 rounded-2xl p-4">
                              <p className="text-slate-300 text-sm mb-1">Valor Total</p>

                              {descontoAtivo && (
                                <p className="text-slate-400 line-through text-sm">
                                  R$ {precoOriginal.toFixed(2)}
                                </p>
                              )}

                              <p className="text-3xl font-bold text-emerald-300">
                                R$ {total.toFixed(2)}
                              </p>

                              {descontoAtivo && (
                                <p className="text-emerald-400 text-sm font-semibold mt-1">
                                  🎉 10% de desconto aplicado
                                </p>
                              )}
                            </div>

                            <Button
                              onClick={() => {
                                const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMERO}&text=${gerarMensagemWhatsApp(produto, qtd, total)}`;
                                window.location.href = url;
                              }}
                              className="w-full rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-black font-bold shadow-2xl py-6 text-lg"
                            >
                              Finalizar Pedido pelo WhatsApp
                            </Button>
                          </>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black/40 backdrop-blur-xl text-center py-10 text-slate-400">
        <p className="mb-2">© {new Date().getFullYear()} Tilápia na Mesa</p>
        <p className="text-sm">Qualidade • Frescor • Confiança</p>
      </footer>
    </div>
  );
}
