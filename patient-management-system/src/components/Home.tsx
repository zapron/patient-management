import { AppShell } from "@mantine/core";

import TopNav from "./TopNav";
import LoginSelection from "./LoginSelection";
import { useState } from "react";

function Home() {
  const [viewertype, setViewerType] = useState<string>("");

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
        <TopNav setViewerType={setViewerType} />
      </AppShell.Header>

      {/* <AppShell.Navbar p="md">Navbar</AppShell.Navbar> */}

      <AppShell.Main>
        <LoginSelection viewertype={viewertype} setViewerType={setViewerType} />
      </AppShell.Main>
    </AppShell>
  );
}

export default Home;
