import * as SelectPrimitive from '@rn-primitives/select';
import type { ComponentProps, ReactNode } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Check, ChevronDown } from '@/lib/icons';
import { cn } from '@/lib/utils';

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

function SelectTrigger({
  className,
  children,
  ...props
}: Omit<ComponentProps<typeof SelectPrimitive.Trigger>, 'children'> & {
  children?: ReactNode;
}) {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        'native:h-12 h-10 flex-row items-center justify-between rounded-md border border-input bg-background px-3 py-2',
        props.disabled && 'opacity-50',
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown size={16} className="text-foreground opacity-50" />
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  portalHost,
  ...props
}: ComponentProps<typeof SelectPrimitive.Content> & { portalHost?: string }) {
  const insets = useSafeAreaInsets();
  return (
    <SelectPrimitive.Portal hostName={portalHost}>
      <SelectPrimitive.Overlay
        style={Platform.OS !== 'web' ? StyleSheet.absoluteFill : undefined}
      >
        <SelectPrimitive.Content
          insets={{ top: insets.top, bottom: insets.bottom, left: 12, right: 12 }}
          className={cn(
            'z-50 rounded-md border border-border bg-popover px-1 py-2 shadow-md',
            className,
          )}
          {...props}
        >
          <SelectPrimitive.Viewport className="gap-1">
            {children}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Overlay>
    </SelectPrimitive.Portal>
  );
}

function SelectItem({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      className={cn(
        'relative flex-row items-center rounded-sm py-2 pl-8 pr-2 active:bg-accent',
        props.disabled && 'opacity-50',
        className,
      )}
      {...props}
    >
      <View className="absolute left-2 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check size={16} className="text-popover-foreground" />
        </SelectPrimitive.ItemIndicator>
      </View>
      <SelectPrimitive.ItemText className="text-base text-popover-foreground" />
    </SelectPrimitive.Item>
  );
}

function SelectLabel({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      className={cn('px-2 py-1.5 text-sm font-semibold text-muted-foreground', className)}
      {...props}
    />
  );
}

function SelectSeparator({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      className={cn('my-1 h-px bg-border', className)}
      {...props}
    />
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
