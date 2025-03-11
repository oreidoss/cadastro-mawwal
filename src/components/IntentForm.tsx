
import { useState, FormEvent } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { saveIntent, downloadPDF } from "@/services/supabaseService";
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
  salesFormat: z.string({ required_error: "Selecione o formato de venda" }),
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
  const [salesFormat, setSalesFormat] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    try {
      intentSchema.parse({ name, whatsapp, state, salesFormat });
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
      // Convert form data to match the database structure
      await saveIntent({
        Nome: name,
        whatsapp: Number(whatsapp), // Convert string to number to match the database type
        Estado: state,
        FormatoVenda: salesFormat
      });
      
      // Iniciar download do PDF após salvar com sucesso
      downloadPDF();
      
      // Limpar o formulário
      setName("");
      setWhatsapp("");
      setState("");
      setSalesFormat("");
      
      onSuccess();
    } catch (error) {
      onError(error as Error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-slide-up">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-amber-100">Nome completo</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite seu nome completo"
          className={`bg-white/10 border-amber-300/30 text-white placeholder:text-amber-100/50 ${errors.name ? "border-red-500" : ""}`}
        />
        {errors.name && <p className="text-sm text-red-300">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="whatsapp" className="text-amber-100">WhatsApp</Label>
        <Input
          id="whatsapp"
          type="tel"
          value={whatsapp}
          onChange={handleWhatsAppChange}
          placeholder="DDD + número (apenas números)"
          className={`bg-white/10 border-amber-300/30 text-white placeholder:text-amber-100/50 ${errors.whatsapp ? "border-red-500" : ""}`}
          maxLength={11}
        />
        {errors.whatsapp && <p className="text-sm text-red-300">{errors.whatsapp}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="state" className="text-amber-100">Estado</Label>
        <Select value={state} onValueChange={setState}>
          <SelectTrigger 
            id="state" 
            className={`bg-white/10 border-amber-300/30 text-white ${errors.state ? "border-red-500" : ""}`}
          >
            <SelectValue placeholder="Selecione seu estado" />
          </SelectTrigger>
          <SelectContent 
            className="z-50 max-h-[300px] overflow-y-auto bg-emerald-900 border border-amber-300/30 text-amber-100"
            position="popper"
            sideOffset={5}
          >
            {BRAZILIAN_STATES.map((stateOption) => (
              <SelectItem 
                key={stateOption.value} 
                value={stateOption.value}
                className="focus:bg-amber-300/20 focus:text-white cursor-pointer"
              >
                {stateOption.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.state && <p className="text-sm text-red-300">{errors.state}</p>}
      </div>

      <div className="space-y-2">
        <Label className="text-amber-100 block mb-2">Formato de Venda</Label>
        <RadioGroup 
          value={salesFormat} 
          onValueChange={setSalesFormat}
          className={`space-y-2 ${errors.salesFormat ? "border-red-500 border rounded-md p-2" : ""}`}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Porta a Porta" id="porta-a-porta" className="border-amber-300/30" />
            <Label htmlFor="porta-a-porta" className="text-amber-100">Porta a Porta</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Loja" id="loja" className="border-amber-300/30" />
            <Label htmlFor="loja" className="text-amber-100">Loja</Label>
          </div>
        </RadioGroup>
        {errors.salesFormat && <p className="text-sm text-red-300">{errors.salesFormat}</p>}
      </div>

      <Button 
        type="submit" 
        className="w-full py-6 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-emerald-900 font-medium transition-all duration-300" 
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
