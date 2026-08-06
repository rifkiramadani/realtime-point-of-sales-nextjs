import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";

export default function FormInput<T extends FieldValues>({
    form,
    name,
    placeholder,
    label,
    type,

}: {
    form: UseFormReturn<T>;
    name: Path<T>;
    placeholder: string;
    label: string;
    type: string;
}) {
    return (
        <Controller
            name={name}
            control={form.control}
            render={({ field, fieldState }) => {
                return (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={label}>{label}</FieldLabel>
                        {type === "textarea" ? (
                            <Textarea {...field} placeholder={placeholder} className="resize-none" />
                        ) : (
                            <Input {...field}
                                className={fieldState.invalid ? "ring-1 focus-visible:ring-red-500" : ''}
                                id={label}
                                type={type}
                                placeholder={placeholder}
                            />
                        )}
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )
            }}
        />
    )
}