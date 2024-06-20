import { auth, signOut } from "@/auth";
import styles from "./nav.module.css";
import Link from "next/link";

export async function Nav() {
  const session = await auth();

  const handleSubmit = async () => {
    "use server";
    await signOut();
  };

  return (
    <header className={styles.header}>
      <h2 className={styles.titleBrand}>Acme.com</h2>
      <nav>
        <ul className={styles.navUl}>
          {session && session.user ? (
            <li>
              <form action={handleSubmit}>
                <button type="submit">Sign out</button>
              </form>
            </li>
          ) : (
            <>
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
