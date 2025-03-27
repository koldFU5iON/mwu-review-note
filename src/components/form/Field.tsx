import { Control, FieldValues, Path } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";

interface FieldProps<T extends FieldValues> { 
  name: Path<T>;
  label: string;
  control: Control<T>;
  children: (field: object) => React.ReactNode;
}

export const Field = <T extends FieldValues>({ 
  name, 
  label, 
  control, 
  children 
}: FieldProps<T>) => {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {children(field)}
          </FormControl>
        </FormItem>
      )}
    />
  );
};
