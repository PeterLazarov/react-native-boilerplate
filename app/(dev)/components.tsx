import type { Option } from '@rn-primitives/select';
import { useState, type ReactNode } from 'react';
import { View } from 'react-native';
import { Screen } from '@/components/Screen';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useToast } from '@/components/Toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { Text } from '@/components/ui/text';
import { Textarea } from '@/components/ui/textarea';

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View className="gap-3">
      <Text className="text-sm font-medium uppercase text-muted-foreground">{title}</Text>
      {children}
      <Separator className="my-2" />
    </View>
  );
}

export default function ComponentsGallery() {
  const { toast } = useToast();
  const [checked, setChecked] = useState(false);
  const [switchOn, setSwitchOn] = useState(false);
  const [radio, setRadio] = useState('standard');
  const [plan, setPlan] = useState<Option>(undefined);

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

      <Section title="Inputs">
        <View className="gap-3">
          <View className="gap-1.5">
            <Label>Email</Label>
            <Input placeholder="you@example.com" />
          </View>
          <View className="gap-1.5">
            <Label>Notes</Label>
            <Textarea placeholder="Notes…" />
          </View>
        </View>
      </Section>

      <Section title="Selection controls">
        <View className="gap-4">
          <View className="flex-row items-center gap-3">
            <Checkbox checked={checked} onCheckedChange={setChecked} />
            <Text>Accept terms</Text>
          </View>
          <View className="flex-row items-center gap-3">
            <Switch checked={switchOn} onCheckedChange={setSwitchOn} />
            <Text>{switchOn ? 'On' : 'Off'}</Text>
          </View>
          <RadioGroup value={radio} onValueChange={setRadio}>
            <View className="flex-row items-center gap-3">
              <RadioGroupItem value="standard" />
              <Text>Standard</Text>
            </View>
            <View className="flex-row items-center gap-3">
              <RadioGroupItem value="express" />
              <Text>Express</Text>
            </View>
          </RadioGroup>
        </View>
      </Section>

      <Section title="Select">
        <Select value={plan} onValueChange={setPlan}>
          <SelectTrigger className="w-56">
            <SelectValue className="text-foreground" placeholder="Pick a plan" />
          </SelectTrigger>
          <SelectContent className="w-56">
            <SelectItem value="basic" label="Basic" />
            <SelectItem value="standard" label="Standard" />
            <SelectItem value="premium" label="Premium" />
          </SelectContent>
        </Select>
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

      <Section title="Overlays">
        <View className="flex-row flex-wrap gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary">
                <Text>Dialog</Text>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dialog</DialogTitle>
                <DialogDescription>
                  Rendered through the root PortalHost.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Text>Alert</Text>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  <Text>Cancel</Text>
                </AlertDialogCancel>
                <AlertDialogAction>
                  <Text>Delete</Text>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Text>Menu</Text>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Text>Edit</Text>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Text>Duplicate</Text>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </View>
      </Section>

      <Section title="Toast">
        <View className="flex-row flex-wrap gap-2">
          <Button
            variant="secondary"
            onPress={() =>
              toast({ title: 'Saved', description: 'Your changes were saved.' })
            }
          >
            <Text>Show toast</Text>
          </Button>
          <Button
            variant="destructive"
            onPress={() =>
              toast({
                title: 'Error',
                description: 'Something went wrong.',
                variant: 'destructive',
              })
            }
          >
            <Text>Error toast</Text>
          </Button>
        </View>
      </Section>
    </Screen>
  );
}
