'use client';

import { cn } from '@/lib/utils';
import { useEffect } from 'react';
import vhCheck from 'vh-check';

export function View({ children, className }: React.ComponentProps<'div'>) {
  useEffect(() => {
    vhCheck();
  }, []);

  return (
    <div
      className={cn(
        'container h-[calc(100vh_-_var(--vh-offset,_0px))] m-auto',
        className,
      )}
    >
      {children}
    </div>
  );
}
