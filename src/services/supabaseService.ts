
import { supabase } from "@/integrations/supabase/client";

// Interface para os dados do formulário
export interface IntentData {
  Nome: string;
  whatsapp: number; // Changed to number to match the database type
  Estado: string;
  FormatoVenda: string; // Using the exact column name from the database
}

// Função para salvar dados no Supabase
export async function saveIntent(data: IntentData): Promise<void> {
  try {
    const { error } = await supabase
      .from('cadastro ma') // Using the correct table name from Supabase
      .insert([data]);
    
    if (error) {
      throw new Error(error.message || 'Falha ao salvar intenção');
    }
  } catch (error) {
    console.error('Erro ao salvar intenção:', error);
    throw error;
  }
}

// Função para fazer download do PDF após o cadastro
export function downloadPDF() {
  // URL do Google Drive para download
  const fileUrl = "https://drive.google.com/file/d/1lEn7_JQmJJDuwKJ9oLd351RTvMC8uulp/view?usp=sharing";
  
  // Abre o link em uma nova aba
  window.open(fileUrl, '_blank');
}
