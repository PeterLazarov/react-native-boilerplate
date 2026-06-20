import type { ReactNode } from 'react';
import { View } from 'react-native';
import { Screen } from '@/components/Screen';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Text } from '@/components/ui/text';

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View className="gap-3">
      <Text className="text-sm font-medium uppercase text-muted-foreground">{title}</Text>
      {children}
      <Separator className="my-2" />
    </View>
  );
}

// Dev component gallery — exercises every ui/ primitive in light/dark for QA.
export default function ComponentsGallery() {
  return (
    <Screen scroll className="gap-6">
      <View className="flex-row items-center justify-between">
        <Text className="text-2xl font-semibold">Components</Text>
        <ThemeToggle />
      </View>

      <Section title="Buttons">
        <View className="flex-row flex-wrap gap-2">
          <Button>
            <Text>Default</Text>
          </Button>
          <Button variant="secondary">
            <Text>Secondary</Text>
          </Button>
          <Button variant="outline">
            <Text>Outline</Text>
          </Button>
          <Button variant="destructive">
            <Text>Destructive</Text>
          </Button>
          <Button variant="ghost">
            <Text>Ghost</Text>
          </Button>
        </View>
      </Section>

      <Section title="Badges">
        <View className="flex-row flex-wrap gap-2">
          <Badge>
            <Text>Default</Text>
          </Badge>
          <Badge variant="secondary">
            <Text>Secondary</Text>
          </Badge>
          <Badge variant="destructive">
            <Text>Destructive</Text>
          </Badge>
          <Badge variant="outline">
            <Text>Outline</Text>
          </Badge>
        </View>
      </Section>

      <Section title="Card">
        <Card>
          <CardHeader>
            <CardTitle>Card title</CardTitle>
            <CardDescription>Card description text.</CardDescription>
          </CardHeader>
          <CardContent>
            <Text>Card body content.</Text>
          </CardContent>
        </Card>
      </Section>

      <Section title="Skeleton">
        <View className="gap-2">
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-20 w-full" />
        </View>
      </Section>

      <Section title="Dialog">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary">
              <Text>Open dialog</Text>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog</DialogTitle>
              <DialogDescription>Rendered through the root PortalHost.</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </Section>

      <Section title="Input">
        <View className="gap-1.5">
          <Label>Email</Label>
          <Input placeholder="you@example.com" />
        </View>
      </Section>
    </Screen>
  );
}
