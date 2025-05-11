"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserTabs({ isAdmin }) {
  const path = usePathname();

  return (
    <div className="flex mx-auto mb-8 gap-2 tabs justify-center flex-wrap">
      <Link className={path === "/profile" ? "active" : ""} href={"/profile"}>
        Adatlap
      </Link>

      {isAdmin && (
        <>
          <Link
            className={path === "/categories" ? "active" : ""}
            href={"/categories"}
          >
            Kategóriák
          </Link>
          <Link
            className={/menu-items/.test(path) ? "active" : ""}
            href={"/menu-items"}
          >
            Kínálat
          </Link>
          <Link
            className={path.includes("/users") ? "active" : ""}
            href={"/users"}
          >
            Felhasználók
          </Link>
          <Link
            className={path === "/bookings" ? "active" : ""}
            href={"/bookings"}
          >
            Foglalások
          </Link>
        </>
      )}

      {!isAdmin && (
        <Link
          className={path === "/user-bookings" ? "active" : ""}
          href={"/user-bookings"}
        >
          Foglalásaim
        </Link>
      )}
    </div>
  );
}
