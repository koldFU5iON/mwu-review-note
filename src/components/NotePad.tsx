declare global {
  interface Window {
    electronAPI: {
      saveNote: (note: string, filename?: string) => void;
    };
  }
}


import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"


// form
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  note: z.string().min(2, {
    message: "Note must be at least 2 characters.",
  }),
})

export const NotePad = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      note: "",
    },
  });
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    const { note } = values;
    console.log('📝 Submitting note:', note);
    console.log('electronAPI:', window.electronAPI);
  
    if (window.electronAPI?.saveNote) {
      window.electronAPI.saveNote(note);
    } else {
      alert("❌ electronAPI not available!");
    }
  }
  
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add a Note:</FormLabel>
              <FormControl>
                <Textarea className="h-100 max-h-120 align-top" placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                Here is where you can submit notes about your game experience.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}