"use server";

import { signIn } from "@/auth";
import { AuthCredentials } from "@/types";

//// imports for sign in fn
// import { db } from "@/database/drizzle";
// import { user } from "@/database/schema";
// import { hash } from "bcryptjs";
// import { eq } from "drizzle-orm";

// sing in with credentials - logic
export const signInWithCredentials = async (params: AuthCredentials) => {
  const { name, password } = params;

  try {
    const result = await signIn("credentials", {
      name,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { success: false, error: result.error };
    }
    return { success: true };
  } catch (error) {
    console.log(error, "Signup error");
    return { success: false, error: "Signin error" };
  }
};

//// sign up with credentials - logic
// export const signUp = async (params: AuthCredentials) => {
//   const { name, password } = params;

//   //Check if user already exist
//   const existingUser = await db
//     .select()
//     .from(user)
//     .where(eq(user.name, name))
//     .limit(1);

//   if (existingUser.length > 0) {
//     return { success: false, error: "User already exist" };
//   }

//   //Hashed password from new user
//   const hashedPassword = await hash(password, 10);

//   try {
//     //signup new user to database
//     await db.insert(user).values({
//       name,
//       password: hashedPassword,
//     });

//     await signInWithCredentials({ name, password });
//   } catch (error) {
//     console.log(error, "Signup error");
//     return { success: false, error: "Signup error" };
//   }
//   return { success: true };
// };
