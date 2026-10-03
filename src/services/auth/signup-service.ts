import bcrypt from "bcrypt";
import { UserRepository } from "@/repositories/user-repository";

export async function signupService(name: string, email: string, password: string) {
  const userRepository = new UserRepository();

  try {
    // Check if email already exists in the DB
    const existingEmail = await userRepository.findByEmail(email);
    if (existingEmail) {
      return { code: 409, status: "error", message: "Email already exists" };
    }

    // If not exist, insert the user to the DB
    const createdData = await userRepository.create({ name, email, password: await bcrypt.hash(password, 10) as string });

    // Return success response
    return {
      code: 201,
      status: "success",
      message: "Created account successfully!",
      data: { user: createdData }
    };
  } catch (error) {
    console.error("Signup Service Error: ", error);
    return { code: 500, status: "error", message: "Unable to create account" };
  }

}