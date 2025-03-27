interface saveNoteProps {
  note: string,
  projectName: string,
  filename?: string,
}

declare global {
  interface Window {
    electronAPI: {
      saveNote: (data: saveNoteProps) => void;
    };
  }
}

import { Input } from "./ui/input";
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea";
import {
  Form
} from "@/components/ui/form"

import { Field } from "@/components/form/Field";

// form
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  note: z.string().min(2, {
    message: "Note must be at least 2 characters.",
  }),
  projectName: z.string().nonempty({
    message: "You must provide a project name"
  })
})

export const NotePad = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      note: "",
      projectName: "",
    },
  });
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('🧪 Form values:', values);
  
    if (!values || !values.note) {
      alert("⚠️ Something went wrong. Note data is missing.");
      return;
    }
  
    if (window.electronAPI?.saveNote) {
      window.electronAPI.saveNote(values);
    } else {
      alert("❌ electronAPI not available!");
    }
  }
  

  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Field name="projectName" control={form.control} label="Project" >
          {(field) => <Input placeholder="project" {...field} />}
        </Field>
        <Field name="note" control={form.control} label="Add a note" >
          {(field) => <Textarea className="h-80 max-h-120 align-top" placeholder="Start typing..." {...field} />}
        </Field>
       
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}