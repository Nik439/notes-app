'use client'
import '../styles/navbar.css'
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [showCommands, setShowCommands] = useState<boolean>(false) 
  const path = usePathname()
  const router = useRouter()  

  useEffect(()=>{
    //set showCommands to true if in note page
    if (path.includes("/note/"))
      setShowCommands(true)
    else
      setShowCommands(false)
  }, [path])

  async function deleteNote() {
    //extract note id from path
    const res = await fetch(`/api/note/${path.substring(path.length-1)}`, {
      method: 'DELETE'
    })
    return await res.json()
  }

  function handleDelete() {
    deleteNote().then(()=>{
      router.push("/")
    }).catch((err)=>{
      console.error(err)
    })
  }

  return (
    <div className="container">
      <div className={`content_left ${showCommands ? "show" : ""}`}>
        <Link className="back_button" href="/">
          <Image className="" src="/arrow.svg" alt="" width={40} height={40}></Image>
        </Link>
        <Image className="logo" src="/icon.svg" alt="" width={60} height={60}></Image>
      </div>
      <div className={`content_right ${showCommands ? "show" : ""}`}>
        <Image onClick={handleDelete} className="" src="/bin.svg" alt="" width={40} height={40}></Image>
      </div>
    </div>
  )
}