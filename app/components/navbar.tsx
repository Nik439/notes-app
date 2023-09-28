'use client'
import '../styles/navbar.css'
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { navbar_commands } from '../models/navbar_commands';

export default function Navbar() {
  const [commandType, setCommandType] = useState<navbar_commands>("") 
  const path = usePathname()
  const router = useRouter()  

  useEffect(()=>{
    //set commandType to corresponding page
    if (path.includes("/note/"))
      setCommandType("edit")
    else if (path == "/")
      setCommandType("home")
    else
      setCommandType("")
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

  async function createNote() {
    const res = await fetch(`/api/note`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(["", "", new Date().toISOString()])
    })
    return await res.json()
  }

  function handleNew() {
    createNote().then(({id})=>{
      router.push(`/note/${id}`)
    }).catch((err)=>{
      console.error(err)
    })
  }

  return (
    <div className="container">
      <div className={`content_left ${commandType=="edit" ? "show" : ""}`}>
        <Link className="back_button" href="/">
          <Image className="" src="/arrow.svg" alt="" width={40} height={40}></Image>
        </Link>
        <Image className="logo" src="/icon.svg" alt="" width={65} height={65}></Image>
      </div>
      <div className={`content_right`}>
        <Image className={`bin ${commandType=="edit" ? "show" : ""}`} onClick={handleDelete} src="/bin.svg" alt="" width={50} height={50}></Image>
        <Image className={`new ${commandType=="home" ? "show" : ""}`} onClick={handleNew} src="/new.svg" alt="" width={50} height={50}></Image>
      </div>
    </div>
  )
}