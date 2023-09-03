'use client'
// React
import React, { useState, useRef } from 'react';

// Next
import { useRouter } from 'next/navigation';

// Material UI
import { Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// Firebase
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

// Helpers
import { auth } from '@/helpers/firebase';
import {
  modalStyles,
  authBox,
  authTitle,
  titleInputs,
  authInput,
  authButton,
  authSelect,
} from "@/helpers/styleConsts";
import { SignUpArgs, SignInArgs, YourUserType } from '@/helpers/interface';

// SCSS
import '../app/styles/allStyles.scss';


export default function Home() {

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const roleRef = useRef<HTMLSelectElement | null>(null);
  const router= useRouter();

  async function signUp({ e }: SignUpArgs): Promise<YourUserType | void> {
    try {
      e.preventDefault();
  
      const email = emailRef?.current?.value || '';
      const password = passwordRef?.current?.value || '';
        
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
  
      return user as YourUserType;
    } catch (err) {
      console.log(err);
    }
  };
  
  async function signIn({ e }: SignInArgs): Promise<YourUserType | void> {
    try {
      e.preventDefault();
      
      const email = emailRef?.current?.value || '';
      const password = passwordRef?.current?.value || '';
  
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      if (user) {
        router.push('/homePage');
      }
  
      return user as YourUserType;
    } catch (err) {
      console.log(err);
    }
  }
  

  return (
    <>
      <Box sx={authBox}>
        <Box sx={modalStyles}>
          <form>
          <Typography sx={authTitle}>Авторизуйтесь</Typography>
          <Typography sx={titleInputs}>Email</Typography>
          <TextField sx={authInput} type='email' inputRef={emailRef}/>
          <Typography sx={titleInputs}>Пароль</Typography>
          <TextField sx={authInput} type='password' inputRef={passwordRef}/>
          <Typography sx={titleInputs}>Оберіть вашу роль</Typography>
          <Button 
            sx={authButton}
            className='authButton'
            onClick={(e) => signUp({ e })}
            type='submit'
          >
            Зареєструватися
          </Button>
          <Typography sx={titleInputs}>Вже зареєстровані?</Typography>
          <Button 
            sx={authButton}
            className='authButton'
            onClick={(e) => signIn({ e })}
            type='submit'
          >
            Увійти
          </Button>
          </form>
        </Box>
      </Box>
    </>
  );
}
