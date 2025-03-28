import { useEffect } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";
import { ProjectFolders } from "./folders/ProjectFolders";

//hooks
import { useProjects } from "@/context/ProjectsContext";

export function AppSidebar() {
  const { projects, isLoading } = useProjects();
  console.log("🎨 RENDER sidebar:", projects);
  useEffect(() => {
    console.log("🔁 Sidebar re-rendered with projects:", projects);
  }, [projects]);

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <span>Folders</span>
          </SidebarGroupLabel>
          {isLoading ? (
            <span>Loading...</span>
          ) : (
            <ProjectFolders projects={projects} />
          )}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarContent>
          <SidebarMenu>
            <Button
              onClick={() => document.documentElement.classList.toggle("dark")}
            >
              Toggle Dark Mode
            </Button>
          </SidebarMenu>
        </SidebarContent>
      </SidebarFooter>
    </Sidebar>
  );
}
