import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import TopNav from "./TopNav";
import LoginSelection from "./LoginSelection";

function Home() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      //   navbar={{
      //     width: 300,
      //     breakpoint: "sm",
      //     collapsed: { mobile: !opened },
      //   }}
      padding="md"
    >
      <AppShell.Header>
        <TopNav />
      </AppShell.Header>

      {/* <AppShell.Navbar p="md">Navbar</AppShell.Navbar> */}

      <AppShell.Main>
        <LoginSelection />
      </AppShell.Main>
    </AppShell>
  );
}

export default Home;
