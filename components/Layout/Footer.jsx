import { Paper,Box } from '@mui/material'
import React from 'react'
import { Facebook, Google, Instagram, Telegram, YouTube } from '@mui/icons-material'

export default function Footer() {
  return (
    <Box 
    elevation={3}
    class="text-center text-white rounded-md drop-shadow-2xl w-full mx-auto sm:w-full sm:mx-auto">
      {/* for urls to other pages */}
  <div class="container pt-9 mx-auto sm:mx-auto sm:w-full" >
    <div class="mb-9 flex justify-center "     id="social-media">
    {/* <p className='bold font-bold text-center'>Follow Us On &nbsp;</p> */}
      <a href="#!" class="mx-4 text-neutral-800 dark:text-white">
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="currentColor"
          viewBox="0 0 24 24">
          <path
            d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
        </svg> */}
        <Facebook />
      </a>
      <a href="#!" class="mx-4 text-neutral-800 dark:text-white">
        <YouTube />
      </a>
      <a href="#!" class="mx-4 text-neutral-800 dark:text-white">
        <Instagram />
      </a>
      <a href="#!" class="mx-4 text-neutral-800 dark:text-white">
        <Telegram />
      </a>
      <a href="#!" class="mx-4 text-neutral-800 dark:text-white">
        <Google />
      </a>
      
    </div>
  </div>

  <div
    class="p-4 text-center make-com-dark">
    © 2023 Copyright :
    <a
      class="text-black dark:text-white"
      href="https://solity.fun"> solity.fun</a>
  </div>
</Box>
  )
}

