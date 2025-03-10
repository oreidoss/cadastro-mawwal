
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/integrations/supabase/client';
import { IntentData } from '@/services/supabaseService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const data = req.body as IntentData;
    
    // Validar dados
    if (!data.name || !data.whatsapp || !data.state) {
      return res.status(400).json({ message: 'Dados incompletos' });
    }

    // Inserir no Supabase
    const { error } = await supabase
      .from('cadastro_mawwal')
      .insert([data]);
    
    if (error) {
      console.error('Erro ao inserir no Supabase:', error);
      return res.status(500).json({ message: error.message });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro inesperado:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
}
