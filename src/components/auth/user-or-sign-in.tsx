import { auth } from "@/auth";
import { SignIn } from "./sign-in";
import { SignOut } from "./sign-out";

export default async function UserOrSignIn() {
  const session = await auth();

  return session?.user ? <SignOut /> : <SignIn />;
}
