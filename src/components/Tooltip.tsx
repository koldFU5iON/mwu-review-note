import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const FileToolTip = ({
  children,
  file,
}: {
  children: React.ReactNode;
  file: string;
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>{file}</TooltipContent>
    </Tooltip>
  );
};
