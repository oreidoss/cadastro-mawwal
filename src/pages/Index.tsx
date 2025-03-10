
import { useState } from "react";
import IntentForm from "@/components/IntentForm";
import { toast } from "@/components/ui/sonner";

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
    <div className="min-h-screen w-full flex flex-col">
      {/* Header */}
      <header className="py-4 px-6 md:px-10 flex justify-between items-center">
        <div className="text-xl md:text-2xl font-bold gradient-text">IntentoApp</div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col-reverse md:flex-row items-center">
        {/* Form Section */}
        <div className="w-full md:w-1/2 p-6 md:p-10 animate-fade-in">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Cadastre seu <span className="gradient-text">interesse</span></h1>
            <p className="text-gray-600 mb-8">
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
            <div className="absolute -inset-0.5 bg-gradient-intent rounded-lg blur opacity-30"></div>
            <div className="relative overflow-hidden rounded-lg shadow-xl">
              <img 
                src="/images/intention-image.jpg" 
                alt="Cadastro de Intenção" 
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 px-6 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} IntentoApp. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Index;
