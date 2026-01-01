import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface TimerState {
  id: string;
  room_id: string;
  is_running: boolean;
  is_break: boolean;
  time_remaining: number;
  started_at: string | null;
  last_action_by: string | null;
  last_action: string | null;
  updated_at: string;
}

export const useRoomTimer = (roomId: string | undefined) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['room-timer', roomId],
    queryFn: async () => {
      if (!roomId) return null;

      const { data, error } = await supabase
        .from('room_timer_state')
        .select('*')
        .eq('room_id', roomId)
        .single();

      if (error) throw error;
      return data as TimerState;
    },
    enabled: !!roomId,
  });

  // Subscribe to realtime updates
  useEffect(() => {
    if (!roomId) return;

    const channel = supabase
      .channel(`timer-${roomId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'room_timer_state',
          filter: `room_id=eq.${roomId}`,
        },
        (payload) => {
          queryClient.setQueryData(['room-timer', roomId], payload.new as TimerState);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId, queryClient]);

  return query;
};

export const useUpdateTimer = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ 
      roomId, 
      updates, 
      action 
    }: { 
      roomId: string; 
      updates: Partial<TimerState>; 
      action: string;
    }) => {
      if (!user) throw new Error('No user');

      const { error } = await supabase
        .from('room_timer_state')
        .update({
          ...updates,
          last_action_by: user.id,
          last_action: action,
        })
        .eq('room_id', roomId);

      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['room-timer', variables.roomId] });
    },
  });
};
