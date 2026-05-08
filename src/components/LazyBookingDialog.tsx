import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon } from 'lucide-react';

// Lazy-load the real BookingDialog so react-day-picker, date-fns calendar
// internals, and the booking form only download on first interaction.
const RealBookingDialog = lazy(() => import('./BookingDialog'));

interface LazyBookingDialogProps {
  trigger?: React.ReactNode;
  triggerText?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  subject?: string;
}

const LazyBookingDialog = (props: LazyBookingDialogProps) => {
  const controlled = props.open !== undefined;
  const [loaded, setLoaded] = useState(false);
  const [internalOpen, setInternalOpen] = useState(false);

  // Controlled mode: load as soon as parent requests open=true.
  useEffect(() => {
    if (controlled && props.open) setLoaded(true);
  }, [controlled, props.open]);

  const ensureLoaded = () => {
    setLoaded(true);
    if (!controlled) setInternalOpen(true);
  };

  // Prefetch the chunk on hover/focus for snappier first-click open.
  const prefetch = () => {
    if (!loaded) import('./BookingDialog');
  };

  if (!loaded) {
    if (controlled) {
      // Parent owns the trigger; nothing to render until they open it.
      return null;
    }

    if (React.isValidElement(props.trigger)) {
      const original = props.trigger as React.ReactElement<any>;
      return React.cloneElement(original, {
        onClick: (e: React.MouseEvent) => {
          original.props.onClick?.(e);
          ensureLoaded();
        },
        onMouseEnter: (e: React.MouseEvent) => {
          original.props.onMouseEnter?.(e);
          prefetch();
        },
        onFocus: (e: React.FocusEvent) => {
          original.props.onFocus?.(e);
          prefetch();
        },
      });
    }

    return (
      <Button
        variant="default"
        size="lg"
        className="gap-2"
        onClick={ensureLoaded}
        onMouseEnter={prefetch}
        onFocus={prefetch}
      >
        <CalendarIcon className="h-4 w-4" />
        {props.triggerText || 'Book a Consultation'}
      </Button>
    );
  }

  const dialogOpen = controlled ? props.open : internalOpen;
  const handleOpenChange = (o: boolean) => {
    if (!controlled) setInternalOpen(o);
    props.onOpenChange?.(o);
  };

  return (
    <Suspense fallback={null}>
      <RealBookingDialog
        {...props}
        open={dialogOpen}
        onOpenChange={handleOpenChange}
      />
    </Suspense>
  );
};

export default LazyBookingDialog;
