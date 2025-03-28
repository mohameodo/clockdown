import { VisuallyHidden } from '@/components/ui/visually-hidden';
import * as DialogPrimitive from '@radix-ui/react-dialog';

export interface DialogProps {
  children: React.ReactNode;
  title: string;
}

export function Dialog({ children, title }: DialogProps) {
  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50" />
        <DialogPrimitive.Content
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-lg"
        >
          <DialogPrimitive.Title asChild>
            <VisuallyHidden>{title}</VisuallyHidden>
          </DialogPrimitive.Title>
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
