
import { useState } from "react";
import IntentForm from "@/components/IntentForm";
import { toast } from "sonner";

const Index = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSuccess = () => {
    setIsSubmitting(false);
    toast.success("Cadastro realizado com sucesso!", {
      description: "Agradecemos pelo seu interesse."
    });
  };

  const handleFormError = (error: Error) => {
    setIsSubmitting(false);
    toast.error("Erro ao realizar cadastro", {
      description: error.message || "Por favor, tente novamente mais tarde."
    });
  };

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
      <main className="flex-1 flex flex-col-reverse md:flex-row items-center">
        {/* Form Section */}
        <div className="w-full md:w-1/2 p-6 md:p-10 animate-fade-in">
          <div className="max-w-md mx-auto bg-white/10 backdrop-blur-sm p-8 rounded-lg border border-white/20 shadow-xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-amber-300">Cadastre seu <span className="gradient-text">interesse</span></h1>
            <p className="text-amber-100 mb-8">
              Preencha o formulário abaixo para se registrar em nossa lista de interesses.
              Entraremos em contato com você em breve!
            </p>
            
            <IntentForm 
              onSuccess={handleFormSuccess} 
              onError={handleFormError}
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
            />
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex justify-center items-center animate-fade-in">
          <div className="relative w-full max-w-lg">
            <div className="absolute -inset-0.5 bg-amber-300/30 rounded-lg blur opacity-30"></div>
            <div className="relative overflow-hidden rounded-lg shadow-xl flex justify-center items-center">
              <img 
                src="/lovable-uploads/b3bf2e3a-2523-4557-90f8-fa5c57cf4067.png" 
                alt="Mawwal Arabia" 
                className="w-64 h-64 md:w-80 md:h-80 object-contain p-8"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 px-6 text-center text-sm text-amber-200/70">
        <p>© {new Date().getFullYear()} Mawwal Arabia. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Index;
