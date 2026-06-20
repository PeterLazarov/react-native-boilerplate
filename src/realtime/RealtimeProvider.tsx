import { createContext, useContext, type ReactNode } from 'react';

/**
 * Realtime seam for live tracking (courier location + booking status).
 *
 * REST cannot push, so tracking needs a separate transport — own WebSocket vs a
 * managed service (Ably/Pusher/Stream) is an OPEN DECISION (see PLAN.md, P5).
 * This is a deliberate no-op for commit 1: it defines the slot so the tracking
 * feature plugs into a stable interface instead of being retrofitted.
 *
 * Realtime data is ephemeral — it is NOT persisted and NOT routed through
 * TanStack Query. Subscribers render the latest pushed state only.
 */
type Unsubscribe = () => void;

interface RealtimeContextValue {
  subscribe: (channel: string, onMessage: (data: unknown) => void) => Unsubscribe;
}

const noop: RealtimeContextValue = {
  subscribe: () => () => {},
};

const RealtimeContext = createContext<RealtimeContextValue>(noop);

export function RealtimeProvider({ children }: { children: ReactNode }) {
  // TODO(P5): construct the real client here and provide it.
  return <RealtimeContext.Provider value={noop}>{children}</RealtimeContext.Provider>;
}

export function useRealtime(): RealtimeContextValue {
  return useContext(RealtimeContext);
}
