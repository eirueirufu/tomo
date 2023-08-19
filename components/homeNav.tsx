'use client';

import {
  Button,
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarBrand,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { ThemeSwitcher } from '@/components/themeSwitch';

export default function HomeNav() {
  const router = useRouter();
  return (
    <Navbar isBordered>
      <NavbarContent justify="start"></NavbarContent>
      <NavbarBrand>
        <p className="font-bold m-auto">TOMO</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarItem>
          <Button
            size="sm"
            color="default"
            variant="flat"
            onClick={() => {
              router.push(`/assistants/`);
            }}
          >
            ADD
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
