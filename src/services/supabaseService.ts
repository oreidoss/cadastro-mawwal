
import { supabase } from "@/integrations/supabase/client";

// Interface para os dados do formulário
export interface IntentData {
  name: string;
  whatsapp: string;
  state: string;
}

// Função para salvar dados no Supabase
export async function saveIntent(data: IntentData): Promise<void> {
  try {
    const { error } = await supabase
      .from('cadastro_mawwal')
      .insert([data]);
    
    if (error) {
      throw new Error(error.message || 'Falha ao salvar intenção');
    }
  } catch (error) {
    console.error('Erro ao salvar intenção:', error);
    throw error;
  }
}
