
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DarkmodeToggle } from "@/components/common/darkmode-toggle";

export default function Home() {
  return (
    <div>
      <Input></Input>
      <Button className={"bg-sky-500 dark:bg-amber-500"}>Rifky</Button>
      <DarkmodeToggle></DarkmodeToggle>
    </div>
  );
}
