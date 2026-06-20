import * as DropdownMenuPrimitive from '@rn-primitives/dropdown-menu';
import type { ComponentProps } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextClassContext } from '@/components/ui/text';
import { cn } from '@/lib/utils';

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuGroup = DropdownMenuPrimitive.Group;

function DropdownMenuContent({
  className,
  portalHost,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Content> & { portalHost?: string }) {
  const insets = useSafeAreaInsets();
  return (
    <DropdownMenuPrimitive.Portal hostName={portalHost}>
      <DropdownMenuPrimitive.Overlay
        style={Platform.OS !== 'web' ? StyleSheet.absoluteFill : undefined}
      >
        <DropdownMenuPrimitive.Content
          insets={{ top: insets.top, bottom: insets.bottom, left: 12, right: 12 }}
          className={cn(
            'z-50 min-w-32 rounded-md border border-border bg-popover p-1 shadow-md',
            className,
          )}
          {...props}
        />
      </DropdownMenuPrimitive.Overlay>
    </DropdownMenuPrimitive.Portal>
  );
}

function DropdownMenuItem({
  className,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Item>) {
  return (
    <TextClassContext.Provider value="text-sm text-popover-foreground">
      <DropdownMenuPrimitive.Item
        className={cn(
          'flex-row items-center rounded-sm px-2 py-1.5 active:bg-accent',
          props.disabled && 'opacity-50',
          className,
        )}
        {...props}
      />
    </TextClassContext.Provider>
  );
}

function DropdownMenuLabel({
  className,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Label>) {
  return (
    <DropdownMenuPrimitive.Label
      className={cn(
        'px-2 py-1.5 text-sm font-semibold text-popover-foreground',
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      className={cn('my-1 h-px bg-border', className)}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
};
