import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const dashboardItems = [
    {
      title: "Clientes",
      href: "/clientes",
      description: "Gerencie seus clientes e cadastre novos"
    },
    {
      title: "Serviços",
      href: "/servicos",
      description: "Cadastre aqui os tipos de serviços prestados e custos associados"
    },
    {
      title: "Técnicos",
      href: "/tecnicos",
      description: "Administre a equipe técnica e custos associados"
    },
    {
      title: "Contratos",
      href: "/contratos",
      description: "Crie e acompanhe todos os contratos ativos"
    },
  ];

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full max-w-6xl">
        <h1 className="text-4xl font-bold text-center mb-8">
          Sistema de gerenciamento de clientes e custos
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {dashboardItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group transition-all duration-300"
            >
              <Card className="p-6 h-full flex flex-col justify-between hover:bg-accent/50 transition-colors">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">{item.title}</h2>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
                <div className="mt-4 flex items-center justify-end">
                  <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </main>

      {/* <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      </footer> */}
    </div>
  );
}