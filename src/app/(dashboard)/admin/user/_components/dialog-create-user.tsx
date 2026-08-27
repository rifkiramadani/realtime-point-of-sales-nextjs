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
import { startTransition, useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createUser } from "../actions";
import FormSelect from "@/components/common/form-select";
import FormImage from "@/components/common/form-image";
import { Preview } from "@/types/general";
import FormUser from "./form-user";

const DialogCreateUser = ({
  refetch,
  onSuccess,
}: {
  refetch: () => void;
  onSuccess?: () => void;
}) => {
  //instance form
  const form = useForm<CreateUserForm>({
    resolver: zodResolver(createUserSchema), //panggil type dan skema form dari auth-validation.ts
    defaultValues: INITIAL_CREATE_USER_FORM,
  });

  const [createUserState, createUserAction, isPendingCreateUser] =
    useActionState(createUser, INITIAL_STATE_CREATE_USER);

  const [preview, setPreview] = useState<Preview | undefined>(undefined);

  //fungsi ketika tombol submit ditekan dan form berfungsi
  const onSubmit = async (data: CreateUserForm) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(
        key,
        key === "avatar_url" ? (preview!.file ?? "") : value,
      );
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
      setPreview(undefined);
      onSuccess?.();
      refetch();
    }
  }, [createUserState, form, refetch, onSuccess]);

  return (
    <FormUser
      form={form}
      onSubmit={form.handleSubmit(onSubmit)}
      isLoading={isPendingCreateUser}
      type="Create"
      preview={preview}
      setPreview={setPreview}
    />
  );
};

export default DialogCreateUser;
