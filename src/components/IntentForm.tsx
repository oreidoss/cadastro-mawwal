
import { useState, FormEvent } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { saveIntent } from "@/services/supabaseService";
import { Loader2 } from "lucide-react";

// Lista de estados brasileiros
const BRAZILIAN_STATES = [
  { value: "AC", label: "Acre" },
  { value: "AL", label: "Alagoas" },
  { value: "AP", label: "Amapá" },
  { value: "AM", label: "Amazonas" },
  { value: "BA", label: "Bahia" },
  { value: "CE", label: "Ceará" },
  { value: "DF", label: "Distrito Federal" },
  { value: "ES", label: "Espírito Santo" },
  { value: "GO", label: "Goiás" },
  { value: "MA", label: "Maranhão" },
  { value: "MT", label: "Mato Grosso" },
  { value: "MS", label: "Mato Grosso do Sul" },
  { value: "MG", label: "Minas Gerais" },
  { value: "PA", label: "Pará" },
  { value: "PB", label: "Paraíba" },
  { value: "PR", label: "Paraná" },
  { value: "PE", label: "Pernambuco" },
  { value: "PI", label: "Piauí" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "RN", label: "Rio Grande do Norte" },
  { value: "RS", label: "Rio Grande do Sul" },
  { value: "RO", label: "Rondônia" },
  { value: "RR", label: "Roraima" },
  { value: "SC", label: "Santa Catarina" },
  { value: "SP", label: "São Paulo" },
  { value: "SE", label: "Sergipe" },
  { value: "TO", label: "Tocantins" },
];

// Schema de validação
const intentSchema = z.object({
  name: z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
  whatsapp: z.string().regex(/^\d{10,11}$/, { 
    message: "WhatsApp inválido. Use apenas números (DDD + número)" 
  }),
  state: z.string().min(2, { message: "Selecione um estado" }),
});

type IntentFormProps = {
  onSuccess: () => void;
  onError: (error: Error) => void;
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
};

const IntentForm = ({ onSuccess, onError, isSubmitting, setIsSubmitting }: IntentFormProps) => {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [state, setState] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    try {
      intentSchema.parse({ name, whatsapp, state });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove tudo que não é número
    const value = e.target.value.replace(/\D/g, "");
    setWhatsapp(value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      await saveIntent({ name, whatsapp, state });
      
      // Limpar o formulário
      setName("");
      setWhatsapp("");
      setState("");
      
      onSuccess();
    } catch (error) {
      onError(error as Error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-slide-up">
      <div className="space-y-2">
        <Label htmlFor="name">Nome completo</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite seu nome completo"
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="whatsapp">WhatsApp</Label>
        <Input
          id="whatsapp"
          type="tel"
          value={whatsapp}
          onChange={handleWhatsAppChange}
          placeholder="DDD + número (apenas números)"
          className={errors.whatsapp ? "border-red-500" : ""}
          maxLength={11}
        />
        {errors.whatsapp && <p className="text-sm text-red-500">{errors.whatsapp}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="state">Estado</Label>
        <Select value={state} onValueChange={setState}>
          <SelectTrigger className={errors.state ? "border-red-500" : ""}>
            <SelectValue placeholder="Selecione seu estado" />
          </SelectTrigger>
          <SelectContent>
            {BRAZILIAN_STATES.map((state) => (
              <SelectItem key={state.value} value={state.value}>
                {state.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.state && <p className="text-sm text-red-500">{errors.state}</p>}
      </div>

      <Button 
        type="submit" 
        className="w-full py-6 intent-button" 
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Enviando...
          </>
        ) : (
          "Cadastrar Interesse"
        )}
      </Button>
    </form>
  );
};

export default IntentForm;
