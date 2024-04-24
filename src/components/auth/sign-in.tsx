import { signIn } from "@/auth";
import { Button } from "../ui/button";

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
      className="h-8"
    >
      <Button type="submit" className="h-8">
        Login
      </Button>
    </form>
  );
}
