import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createMenu } from "../actions";
import { Preview } from "@/types/general";
import { MenuForm, menuFormSchema } from "@/validations/menu-validation";
import { INITIAL_MENU, INITIAL_STATE_MENU } from "@/constants/menu-constants";
import FormMenu from "./form-menu";

const DialogCreateMenu = ({
  refetch,
  onSuccess,
}: {
  refetch: () => void;
  onSuccess?: () => void;
}) => {
  //instance form
  const form = useForm<MenuForm>({
    resolver: zodResolver(menuFormSchema), //panggil type dan skema form dari auth-validation.ts
    defaultValues: INITIAL_MENU,
  });

  const [createMenuState, createMenuAction, isPendingCreateMenu] =
    useActionState(createMenu, INITIAL_STATE_MENU);

  const [preview, setPreview] = useState<Preview | undefined>(undefined);

  //fungsi ketika tombol submit ditekan dan form berfungsi
  const onSubmit = async (data: MenuForm) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, key === "image_url" ? (preview!.file ?? "") : value);
    });

    startTransition(() => {
      createMenuAction(formData);
    });
  };

  useEffect(() => {
    if (createMenuState?.status == "error") {
      toast.error("Create Menu Failed", {
        description: createMenuState.errors?._form?.[0],
      });
    }

    if (createMenuState?.status === "success") {
      toast.success("Create Menu Success");
      form.reset();
      setPreview(undefined);
      onSuccess?.();
      refetch();
    }
  }, [createMenuState, form, refetch, onSuccess]);

  return (
    <FormMenu
      form={form}
      onSubmit={onSubmit}
      isLoading={isPendingCreateMenu}
      type="Create"
      preview={preview}
      setPreview={setPreview}
    />
  );
};

export default DialogCreateMenu;
