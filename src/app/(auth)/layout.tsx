import { DarkmodeToggle } from "@/components/common/darkmode-toggle";
import { Coffee } from "lucide-react";
import { ReactNode } from "react";

//untuk tipe children nya (children meruakan props yang akan di gunakan untuk mengisi layout nya)
type AuthLayoutProps = {
    children: ReactNode,
}

//kalau layout pasti menggunakan children
export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="relative bg-muted flex min-h-svh items-center justify-center">
            <div className="absolute top-4 right-4">
                <DarkmodeToggle />
            </div>
            <div className="flex w-full max-w-sm flex-col gap-6">
                <div className="flex items-center gap-2 self-center font-medium">
                    <div className="bg-teal-500 flex p-2 items-center justify-center rounded">
                        <Coffee className="size-4" />
                    </div>
                    Ignaciasz Coffe
                </div>
                {children}
            </div>
        </div>
    )
}