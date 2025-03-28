import { FolderOpen, NotebookText, ChevronDown, Plus } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarMenuAction,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

// Menu folders.
const folders = [
  {
    title: "Project 1",
    url: "#",
  },
  {
    title: "Project 2",
    url: "#",
  },
];

const files = [
  {
    name: "file 1",
    url: "#",
    parent: "Project 1",
  },
  {
    name: "file 2",
    url: "#",
    parent: "Project 1",
  },
  {
    name: "file 3",
    url: "#",
    parent: "Project 1",
  },
  {
    name: "file 4",
    url: "#",
    parent: "Project 1",
  },
  {
    name: "file 1",
    url: "#",
    parent: "Project 2",
  },
  {
    name: "file 2",
    url: "#",
    parent: "Project 2",
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Folders</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {folders.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Collapsible defaultOpen className="group/collapsible">
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton asChild>
                        {/* <SidebarMenuAction>
                          <Plus />
                        </SidebarMenuAction> */}
                        <a href={item.url}>
                          <FolderOpen />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                      {/* <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" /> */}
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      {files
                        .filter((file) => file.parent === item.title)
                        .map((file) => (
                          <SidebarMenuSub>
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton className="flex flex-row">
                                <NotebookText />
                                <a href={file.url}>
                                  <span>{file.name}</span>
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          </SidebarMenuSub>
                        ))}
                    </CollapsibleContent>
                  </Collapsible>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
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
