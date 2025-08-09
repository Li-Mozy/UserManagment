<script setup>
    import { NuxtLayout } from "#components"
    import "../assets/loader.css"
    
    const email = ref('')
    const password = ref('')
    const username = ref('')
    const usernameWarning = ref('')
    const emailWarning = ref('')
    const passwordWarning = ref('')

    
    const login = ref(true)
    const loading = ref(false)

    const successMessage = ref('')


    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }


    function onEmailInput(e) {
        const mail = e.target.value
        if (isValidEmail(mail) ){
            email.value = mail
            emailWarning.value = ""
        } else {
            emailWarning.value = "Must be a valid email"
            email.value = ''
        }
    }

    function onPasswordInput(e){
        const pass = e.target.value
        if (pass.length >=8){
            password.value = pass
            passwordWarning.value = ""
        } else if (pass.length<3 && pass.length>0){
            passwordWarning.value = "Password must be atleast 8 characters long"
            password.value = ''
        }
    }

    function onUsernameInput(e){
        const name = e.target.value
        if (name.length >=3){
            username.value = name
            usernameWarning.value = ""
        } else if (name.length<3 && name.length>0){
            usernameWarning.value = "Name must be atleast 3 characters long"
            username.value = ''
        }
    }


    function toggleLogin(){
        login.value === true?login.value = false: login.value = true
        email.value = ''
        password.value = ''
        username.value = ''
        usernameWarning.value = ''
        passwordWarning.value = ''
        emailWarning.value = ''
        successMessage.value = ''


    }

    


    async function handleSignUp(){

        loading.value = true
        const payload = {
            username:username.value,
            email:email.value,
            password:password.value
        }
        const addUser = await $fetch('/api/register',{
            method:"POST",
            body:{...payload}
        })
        loading.value = false
        if (addUser.success === true){
            successMessage.value = addUser.message
        } else {
            successMessage.value = addUser.message
        }
        
    }

        
    async function handleLogin(){
        loading.value = true
        const payload =  {
            email :email.value,
            password:password.value
        }
        const logUser = await $fetch('/api/login',{
            method:"POST",
            body:{...payload}
        })
        loading.value = false
        if (logUser.success === true){
            successMessage.value = logUser.message
            // await navigateTo('/users')
        } else {
            successMessage.value = logUser.message
        }
    }

    function checkLog(){
        if (email.value !== '' && password.value !==''){
            return false
        }else{
            return true
        }
        
    }
    function checkRegister(){
        if (email.value !== '' && password.value !== '' && username.value !== ''){
            return false
        }else{
            return true
        }
        
    }

</script>


<template>
    <div class="flex  w-fit h-fit  justify-center  rounded-lg border-1 border-[#E5E5E5] shadow-lg">
        <img src="../assets/Images/Rectangle 2756.png" alt="" class=" w-[500px] rounded-l-lg hidden lg:block ">
        <div v-if="login" class="flex flex-col  m-auto p-8 gap-8   ">
           
            <div class="flex items-center gap-3">
                <img  src="../assets/Images/Avatar-UI-Unicorn-V2.png" alt="">
                <h1 class="text-2xl font-semibold">UI Unicorn</h1>
            </div>
            <h1 class="font-medium text-lg">Nice to see you again </h1>
            <div class=" flex flex-col  gap-6 ">
                <div class="w-full flex flex-col">
                    <label  for="email" class="mb-2 text-sm">Login</label>
                    <input @input="onEmailInput"  type="email" name="email" id="email" placeholder="Email " class="text-[#808080] bg-[#E5E5E5] min-w-[300px] max-w-[350px] min-h-[48px] rounded-lg p-3 outline-none">
                    <p class= "text-red-500 text-[12px] mt-1 font-medium flex items-center">{{ emailWarning }}</p>
                </div>
                <div class="w-full flex flex-col">
                    <label for="password" class="mb-2 text-sm">Password</label>
                    <input @input="onPasswordInput" type="password" name="password" id="password" placeholder="Enter Password" class="text-[#808080] bg-[#E5E5E5] min-w-[300px] max-w-[350px] min-h-[48px] rounded-lg p-3 outline-none">
                    <p class="text-red-500 text-[12px] mt-1 font-medium flex items-center">{{ passwordWarning }}</p>
                    
                </div>
            </div>
            <div class="w-full flex flex-col items-center gap-3">
                <p class="text-[#007AFF] text-[12px] mt-1 font-medium flex items-center">{{ successMessage }}</p>
                <button @click="handleLogin"   class="bg-[#007AFF] w-full rounded-lg p-2 text-white font-semibold hover:opacity-95  disabled:opacity-50" :disabled="checkLog()">
                    <span v-if="loading" class="loader"></span>
                    <span v-else>Sign In</span>
                </button>
                <p class="font-regular text-sm">Don't have an account? <span @click="toggleLogin" class="text-[#007AFF] hover:cursor-pointer hover:opacity-95">Sign up now</span></p>
            </div>
        </div>
        <div v-else="login" class="flex flex-col  m-auto p-8 gap-8   ">
            <div class="flex items-center gap-3">
                <img  src="../assets/Images/Avatar-UI-Unicorn-V2.png" alt="">
                <h1 class="text-2xl font-semibold">UI Unicorn</h1>
            </div>
            <h1 class="font-medium text-lg">Nice to see you again</h1>
            <div class=" flex flex-col  gap-6 ">
                <div class="w-full flex flex-col">
                    <label  for="name" class="mb-2 text-sm">Username</label>
                    <input @input="onUsernameInput"   type="text" name="text" id="text" placeholder="Username" class="text-[#808080] bg-[#E5E5E5] min-w-[300px] max-w-[350px] min-h-[48px] rounded-lg p-3 outline-none">
                    <p class="text-red-500 text-[12px] mt-1 font-medium flex items-center">{{ usernameWarning }}</p>
                </div>
                <div class="w-full flex flex-col">
                    <label  for="email" class="mb-2 text-sm">Login</label>
                    <input @input="onEmailInput"  type="email" name="email" id="email" placeholder="Email" class="text-[#808080] bg-[#E5E5E5] min-w-[300px] max-w-[350px] min-h-[48px] rounded-lg p-3 outline-none">
                    <p class="text-red-500 text-[12px] mt-1 font-medium flex items-center">{{ emailWarning }}</p>
                </div>
                <div class="w-full flex flex-col">
                    <label for="password" class="mb-2 text-sm">Password</label>
                    <input @input="onPasswordInput" type="password" name="password" id="password" placeholder="Enter Password" class="text-[#808080] bg-[#E5E5E5] min-w-[300px] max-w-[350px] min-h-[48px] rounded-lg p-3 outline-none">
                    <p class="text-red-500 text-[12px] mt-1 font-medium flex items-center">{{ passwordWarning }}</p>
                </div>
            </div>
            <div class="w-full flex flex-col items-center gap-3">
                <p class="text-[#007AFF] text-[12px] mt-1 font-medium flex items-center">{{ successMessage }}</p>
                <button @click="handleSignUp" class="bg-[#007AFF] w-full rounded-lg p-2 text-white font-semibold hover:opacity-95 disabled:opacity-50" :disabled="checkRegister()" >
                    <span v-if="loading" class="loader"></span>
                    <span v-else>Sign Up</span>
                </button>
                <p class="font-regular text-sm">Already have an account? <span @click="toggleLogin" class="text-[#007AFF] hover:cursor-pointer hover:opacity-95" >Sign in now</span></p>
            </div>
        </div>
    </div>
</template>