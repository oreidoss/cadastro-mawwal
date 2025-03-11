import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { downloadPDF } from "@/services/supabaseService";

const Success = () => {
  // Optional: automatically trigger download on page load
  useEffect(() => {
    // You can uncomment this if you want automatic download on page load
    // downloadPDF();
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900">
      {/* Header */}
      <header className="py-4 px-6 md:px-10 flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="/lovable-uploads/b3bf2e3a-2523-4557-90f8-fa5c57cf4067.png"
            alt="Mawwal Arabia"
            className="h-12 md:h-16"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full bg-white/10 backdrop-blur-sm p-8 rounded-lg border border-white/20 shadow-xl text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-500 rounded-full mx-auto flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-amber-200 mb-4">
            Cadastro Realizado com Sucesso!
          </h1>

          <p className="text-white/80 mb-8">
            Obrigado pelo seu interesse! Entraremos em contato em breve com mais
            informações.
          </p>

          <div className="space-y-6">
            <Button
              onClick={downloadPDF}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 px-6 rounded-md font-medium transition-all"
            >
              Baixar Catálogo
            </Button>

            <Link to="/" className="block w-full">
              <Button
                variant="outline"
                className="w-full bg-white text-emerald-800 hover:bg-white/90 py-3 px-6 rounded-md font-medium transition-all border-0"
              >
                Voltar para Página Inicial
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 px-6 text-center text-sm text-amber-200/70"></footer>
    </div>
  );
};

export default Success;
