import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";

export default function Nav(props: { name: string }) {
  return (
    <Navbar isBordered>
      <NavbarBrand></NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem className="flex justify-center items-center">
          <h1 className="font-bold">{props.name}</h1>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end"></NavbarContent>
    </Navbar>
  );
}
