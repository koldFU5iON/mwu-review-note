import { FolderOpen, NotebookText } from "lucide-react";
// ChevronDown, Plus to be added for collapsible
import {
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "../ui/sidebar";

import { FileToolTip } from "@/components/Tooltip";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

interface File {
  name: string;
  path: string;
}

type ProjectFoldersProps = {
  projects: Record<string, File[]>;
};

export const ProjectFolders = ({ projects }: ProjectFoldersProps) => {
  //   const folders = Object.keys(projects);

  return (
    <SidebarGroupContent>
      <SidebarMenu>
        {Object.entries(projects).map(([project, files]) => (
          <SidebarMenuItem key={project}>
            <Collapsible defaultOpen className="group/collapsible">
              <CollapsibleTrigger asChild>
                <SidebarMenuButton asChild>
                  <span className="flex items-center gap-2">
                    <FolderOpen />
                    {project}
                  </span>
                </SidebarMenuButton>
              </CollapsibleTrigger>

              <CollapsibleContent>
                {files.map((file) => (
                  <SidebarMenuSub key={file.path}>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <FileToolTip file={file.name}>
                          <span className="flex items-center gap-2 truncate overflow-hidden whitespace-nowrap max-w-[160px] cursor-pointer">
                            <NotebookText />
                            {file.name}
                          </span>
                        </FileToolTip>
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
  );
};
