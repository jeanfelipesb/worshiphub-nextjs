// middleware.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server"; // Importando para tipagem

// Define os privilégios válidos usando const assertion
const validPrivileges = [
  "FORTMATION_READ",
  "MEMBER_READ",
  "MEMBER_UNAVAILABILITY_READ",
  "PARTICIPATION_READ",
  "SCHEDULE_READ",
  "SONG_READ",
  "USER_READ",
  "ASSIGNMENT_READ",

  "FORTMATION_WHITE",
  "MEMBER_WHITE",
  "MEMBER_UNAVAILABILITY_WHITE",
  "PARTICIPATION_WHITE",
  "SCHEDULE_WHITE",
  "SONG_WHITE",
  "USER_WHITE",
  "ASSIGNMENT_WHITE",

  "FORTMATION_EDIT",
  "MEMBER_EDIT",
  "MEMBER_UNAVAILABILITY_EDIT",
  "PARTICIPATION_EDIT",
  "SCHEDULE_EDIT",
  "SONG_EDIT",
  "USER_EDIT",
  "ASSIGNMENT_EDIT",

  "FORTMATION_DELETE",
  "MEMBER_DELETE",
  "MEMBER_UNAVAILABILITY_DELETE",
  "PARTICIPATION_DELETE",
  "SCHEDULE_DELETE",
  "SONG_DELETE",
  "USER_DELETE",
  "ASSIGNMENT_DELETE",
] as const; 

// Extrai o tipo Privileges a partir de validPrivileges
type Privileges = typeof validPrivileges[number];

// Mapeia rotas para os privilégios exigidos
const routePrivileges: Record<string, Privileges[]> = {
  "/admin/teste": ["FORTMATION_DELETE", "MEMBER_DELETE"], 
};

const hasPrivilege = (userPrivileges: string[], requiredPrivileges: Privileges[]) =>
  requiredPrivileges.some(privilege => userPrivileges.includes(privilege));

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const userPrivileges: string[] = token.privileges || [];
  const { pathname } = req.nextUrl;

  console.log(pathname)
  if (pathname == "/")
    return NextResponse.redirect(new URL("/admin", req.url));


  const requiredPrivileges = routePrivileges[pathname];

  if (requiredPrivileges && !hasPrivilege(userPrivileges, requiredPrivileges)) {
    return NextResponse.redirect(new URL("/403", req.url));
  }

  return NextResponse.next();
}

// Configura as rotas protegidas pelo middleware
export const config = {
  matcher: ["/admin/teste/:path*", "/dashboard/:path*","/"], // Adicione mais rotas conforme necessário
};
