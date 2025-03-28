import { Input } from "./ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form } from "@/components/ui/form";

import { Field } from "@/components/form/Field";

// form
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const formSchema = z.object({
  note: z.string().min(2, {
    message: "Note must be at least 2 characters.",
  }),
  projectName: z.string().nonempty({
    message: "You must provide a project name",
  }),
});

export const NotePad = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      note: "",
      projectName: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("🧪 Form values:", values);

    if (!values || !values.note) {
      alert("⚠️ Something went wrong. Note data is missing.");
      return;
    }

    if (window.electronAPI?.saveNote) {
      const timestamp = new Date();
      window.electronAPI.saveNote(values);
      toast(`${values.projectName} saved!\n ${timestamp.toLocaleDateString()}`);
    } else {
      alert("❌ electronAPI not available!");
    }
  }

  return (
    <div className="flex flex-col border rounded-md p-2 m-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Field name="projectName" control={form.control} label="">
            {(field) => (
              <Input className="m-0 border-0" placeholder="Title" {...field} />
            )}
          </Field>
          <Separator className="m-0 p-0" />
          <Field name="note" control={form.control} label="">
            {(field) => (
              <Textarea
                className="m-0 border-0 h-80 max-h-120"
                placeholder="Start typing..."
                {...field}
              />
            )}
          </Field>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};
