import { useEffect } from 'react';
import vhCheck from 'vh-check';

export function View({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    vhCheck();
  }, []);
  return (
    <div className="container h-[calc(100vh_-_var(--vh-offset,_0px))] m-auto">
      {children}
    </div>
  );
}
