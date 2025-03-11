
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
  // URL do PDF para download
  const pdfUrl = '/catalogo.pdf'; // Substitua pelo caminho real do PDF
  
  // Cria um elemento <a> para iniciar o download
  const link = document.createElement('a');
  link.href = pdfUrl;
  link.download = 'catalogo-mawwal.pdf'; // Nome do arquivo que será baixado
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
