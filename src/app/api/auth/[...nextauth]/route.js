
import CredentialsProvider from "next-auth/providers/credentials";
import mongoose from "mongoose";
import  {User}  from "@/models/User";
import bcrypt from "bcrypt";
import { UserInfo } from "@/models/UserInfo";
import NextAuth, { getServerSession } from "next-auth";


export const authOptions = ({
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
        name: "Credentials",
        credentials: {
          username: { label: "Email", type: "email", placeholder: "test@test.com" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          const email = credentials?.email;
          const password = credentials?.password;
  
          mongoose.connect(process.env.MONGO_URL);
          const user = await User.findOne({email});
          const passwordOk = user && bcrypt.compareSync(password, user.password);
          
          console.log({password});

          if (passwordOk) {
            return user;
          }
  
          return null
        }
      })
  ]
})

export async function isAdmin(){
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return false;
  }
  const userInfo = await UserInfo.findOne({email:userEmail});
  if (!userInfo){
    return false;
  }
  return userInfo.admin;
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }