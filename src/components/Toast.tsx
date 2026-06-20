import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { Animated, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

type ToastVariant = 'default' | 'destructive';

type ToastOptions = {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
};

type ToastContextValue = { toast: (opts: ToastOptions) => void };

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<ToastOptions | null>(null);
  const insets = useSafeAreaInsets();
  const opacity = useRef(new Animated.Value(0)).current;
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hide = useCallback(() => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => setCurrent(null));
  }, [opacity]);

  const toast = useCallback(
    (opts: ToastOptions) => {
      if (timer.current) clearTimeout(timer.current);
      setCurrent(opts);
      opacity.setValue(0);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
      timer.current = setTimeout(hide, opts.duration ?? 3000);
    },
    [hide, opacity],
  );

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {current ? (
        <Animated.View
          pointerEvents="box-none"
          style={{
            position: 'absolute',
            left: 16,
            right: 16,
            top: insets.top + 8,
            opacity,
            zIndex: 100,
          }}
        >
          <View
            className={cn(
              'rounded-lg border border-border p-4 shadow-lg',
              current.variant === 'destructive' ? 'bg-destructive' : 'bg-card',
            )}
          >
            <Text
              className={cn(
                'font-semibold',
                current.variant === 'destructive'
                  ? 'text-destructive-foreground'
                  : 'text-card-foreground',
              )}
            >
              {current.title}
            </Text>
            {current.description ? (
              <Text
                className={cn(
                  'text-sm',
                  current.variant === 'destructive'
                    ? 'text-destructive-foreground'
                    : 'text-muted-foreground',
                )}
              >
                {current.description}
              </Text>
            ) : null}
          </View>
        </Animated.View>
      ) : null}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>');
  return ctx;
}
