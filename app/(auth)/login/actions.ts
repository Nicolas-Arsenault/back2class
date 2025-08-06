'use server';

import { revalidatePath } from "next/cache";
import {redirect} from 'next/navigation';
import {AUTH} from '@/lib/constants';

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData){
  const supabase = await createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  if(data.email == "" || data.password == "")
  {
    return {error: "Veuillez remplir tous les champs."}
  }

  if(!data.email.includes('@'))
  {
    return {error: "Veuillez entrer une adresse courrielle valide."}
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
  const username = formData.get('username') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const repeatedPass = formData.get('repeatedPass') as string;


  if(username == "" || email == "" || password == "" || repeatedPass == "")
  {
    return {error:"Veuillez remplir tous les champs."};
  }

  const { data: emailExistsData, error: emailExistsError } = await supabase
  .rpc(AUTH.EMAIL_UNIQUE_FUNCTION, { email_input: email }); // <-- match parameter name

  if (emailExistsError) {
    return { error: "Erreur lors de la verification de l'adresse mail. Veuillez contacter le support. support@back2class.com" };
  }

  if (emailExistsData === true) {
    return { error: "Cette adresse email est déjà utilisée." };
  }

  if (username.length < 3) {
    return { error: "Le nom d'utilisateur doit contenir au moins 3 caractères." };
  }

  if(username.length > 20)
  {
    return {error:"Le nom d'utilisateur ne doit pas dépasser 20 caractères."};
  }

  if(username.includes(" "))
  {
    return {error:"Le nom d'utilisateur ne doit pas contenir d'espaces."};
  }
  

//add checks for length etc.. characters
  if(repeatedPass != password)
  {
    
    return {error:"Les mots de passe ne correspondent pas."};
  }

  if(!email.includes("@"))
  {
    return{error:"Addresse courrielle invalide! Veuillez utiliser une adresse valide."};
  }

  const {error} = await supabase.auth.signUp({
    email:email,
    password:password,
    options:{
      data:{
        displayName:username
      }
    }
  });

  if(error)
  {
    return {error:error.message};
  }

  return {success:"Inscription reussite. Veuillez regarder vos emails pour un lien de confirmation."};

}