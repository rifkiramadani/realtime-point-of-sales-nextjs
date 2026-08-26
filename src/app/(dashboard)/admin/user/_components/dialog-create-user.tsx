import FormInput from "@/components/common/form-input";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  INITIAL_CREATE_USER_FORM,
  INITIAL_STATE_CREATE_USER,
  ROLE_LIST,
} from "@/constants/auth-constant";
import {
  CreateUserForm,
  createUserSchema,
} from "@/validations/auth-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createUser } from "../actions";
import FormSelect from "@/components/common/form-select";

const DialogCreateUser = ({ refetch }: { refetch: () => void }) => {
  //instance form
  const form = useForm<CreateUserForm>({
    resolver: zodResolver(createUserSchema), //panggil type dan skema form dari auth-validation.ts
    defaultValues: INITIAL_CREATE_USER_FORM,
  });

  const [createUserState, createUserAction, isPendingCreateUser] =
    useActionState(createUser, INITIAL_STATE_CREATE_USER);

  //fungsi ketika tombol submit ditekan dan form berfungsi
  const onSubmit = async (data: CreateUserForm) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    startTransition(() => {
      createUserAction(formData);
    });
  };

  useEffect(() => {
    if (createUserState?.status == "error") {
      toast.error("Create User Failed", {
        description: createUserState.errors?._form?.[0],
      });
    }

    if (createUserState?.status === "success") {
      toast.success("Create User Success");
      form.reset();
      document.querySelector<HTMLButtonElement>('[data-state="open"]')?.click();
      refetch();
    }
  }, [createUserState, form, refetch]);

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Create User</DialogTitle>
        <DialogDescription>Register A New User</DialogDescription>
      </DialogHeader>
      <form id="create-user-form" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <FormInput
            form={form}
            name="name"
            label="Name"
            type="text"
            placeholder="Insert Your Name"
          />
          <FormInput
            form={form}
            name="email"
            label="Email"
            type="email"
            placeholder="Insert Your Email"
          />
          <FormSelect
            form={form}
            label="Role"
            name="role"
            selectItem={ROLE_LIST}
          />
          <FormInput
            form={form}
            name="password"
            label="Password"
            type="password"
            placeholder="Insert Your Password"
          />
        </div>
      </form>
      <DialogFooter>
        <DialogClose render={<Button variant="outline">Cancel</Button>} />
        <div className="flex flex-row gap-3">
          <Button
            type="button"
            variant={"outline"}
            onClick={() => form.reset()}
          >
            Reset
          </Button>
          <Button type="submit" form="create-user-form">
            {isPendingCreateUser ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  );
};

export default DialogCreateUser;
