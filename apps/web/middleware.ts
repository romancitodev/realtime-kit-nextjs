import { routes } from "@/utils/route";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth(async (req) => {
	const { nextUrl: url } = req;

	const logged = !!req.auth;
	const onApiRoute = url.pathname.includes(routes.auth.prefix);
	const onPublicRoute = routes.public.includes(url.pathname);
	const onAuthRoute =
		routes.auth.login.includes(url.pathname) ||
		routes.auth.register.includes(url.pathname);
	const onProtectedRoute = routes.protected.includes(url.pathname);

	if (onApiRoute || onPublicRoute) return NextResponse.next();

	if (onAuthRoute && logged)
		return Response.redirect(new URL(routes.redirect, url));

	if (!logged && onProtectedRoute)
		return Response.redirect(new URL(routes.auth.login, url));

	return NextResponse.next();
});

// Optionally, don't invoke Middleware on some paths
export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
