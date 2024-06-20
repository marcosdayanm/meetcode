export { default } from "next-auth/middleware";

// cuáles rutas verificar si estás logged in
export const config = { matcher: ["/your-rooms", "/browse", "/edit-room"] };
