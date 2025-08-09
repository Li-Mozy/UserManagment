import { supabase } from "#imports"
export default defineEventHandler(async (event)=>{
    let {data:users,error} = await supabase
    .from('users')
    .select('*')

    if (!error){
        return {users}
    }

})