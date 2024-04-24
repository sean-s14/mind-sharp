import { signOut } from "@/auth";
import { Button } from "../ui/button";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
      className="h-8"
    >
      <Button type="submit" className="h-8">
        Sign Out
      </Button>
    </form>
  );
}
