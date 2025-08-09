import { supabase } from "#imports"
import bcrypt from 'bcrypt'
export default defineEventHandler(async (event)=>{
    const {username,email,password} = await readBody(event)
    const saltrouned = 10
    const hashedPassword = await bcrypt.hash(password,saltrouned)
    const {data,error} = await supabase
    .from('users')
    .insert([
        {username:username,email:email,password:hashedPassword},

    ])
    .select()
    if (error?.code === "23505"){
        return {
            success:false,
            code:error.code,
            message:'User Already exists, Please try again'
        }
    } else {
        return {
            success:true,
            message:"User registered successfully. Please return to login Screen"
        }
    }

})