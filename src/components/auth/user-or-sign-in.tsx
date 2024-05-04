import { auth } from "@/auth";
import { SignIn } from "./sign-in";
import Profile from "./profile";

export default async function UserOrSignIn() {
  const session = await auth();

  return session?.user ? <Profile /> : <SignIn />;
}
