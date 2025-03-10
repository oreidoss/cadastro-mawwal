
// Interface para os dados do formulário
export interface IntentData {
  name: string;
  whatsapp: string;
  state: string;
}

// Função para salvar dados no Supabase
export async function saveIntent(data: IntentData): Promise<void> {
  try {
    const response = await fetch('/api/intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Falha ao salvar intenção');
    }
  } catch (error) {
    console.error('Erro ao salvar intenção:', error);
    throw error;
  }
}
