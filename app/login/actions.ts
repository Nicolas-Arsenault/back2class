'use server';

import { revalidatePath } from "next/cache";
import {redirect} from 'next/navigation';

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData){
  const supabase = await createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const {error} = await supabase.auth.signInWithPassword(data);

  if(error){
    return {error:error.message}
  }

  revalidatePath('/','layout');
  redirect('/home');
}

export async function signup(formData:FormData)
{
  const supabase = await createClient();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const repeatedPass = formData.get('repeatedPass') as string;
  
  if(repeatedPass != password)
  {
    
    return {error:"Les mots de passe ne correspondent pas."};
  }

  if(!email.includes("@cegepsi.ca"))
  {
    return{error:"Addresse du cegep de sept iles invalide! Veuillez utiliser une adresse finissant par @cegepsi.ca"};
  }

  const displayName = email.split('.')[0];
  const {error} = await supabase.auth.signUp({
    email:email,
    password:password,
    options:{
      data:{
        displayName:displayName
      }
    }
  });

  if(error)
  {
    
    return {error:error.message};
  }


  return {success:"Inscription reussite. Veuillez regarder vos emails pour un lien de confirmation."};

}