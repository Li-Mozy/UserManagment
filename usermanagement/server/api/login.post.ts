import { supabase } from "#imports"
import bcrypt from 'bcrypt'
export default defineEventHandler(async (event)=>{
    const {email,password} = await readBody(event)

   let {data:users,error} = await supabase
   .from('users')
   .select('*')
   .eq('email',email)
   
   if (users && users.length === 0){
    return {
        success:false,
        message:'User does not exist, Please Register',
        data:users
    }
} else if (users && users.length > 0) {
    const user = users[0];
    const hashedPassword = user.password;
    const match = await bcrypt.compare(password, hashedPassword);
    
    if (match) {
        return {
            success: true,
            message: "User Logged in successfully.",
            data: users
        };
    } else {
        return {
            success: false,
            message: "Invalid password."
        };
    }
}

})