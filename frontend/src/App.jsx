import { useState, useEffect } from "react"

import UploadBox from "./components/UploadBox"
import Sidebar from "./components/Sidebar"
import Conversation from "./components/Conversation"

function App() {

  const [preview, setPreview] =
    useState(null)

  const [loading, setLoading] =
    useState(false)

  const [chats, setChats] =
    useState([])

  const [currentChat, setCurrentChat] =
    useState(null)

  useEffect(() => {

    const savedChats =
      localStorage.getItem(
        "skinCancerChats"
      )

    if (savedChats) {

      const parsed =
        JSON.parse(savedChats)

      setChats(parsed)

      if (parsed.length > 0)
        setCurrentChat(parsed[0])

    }

  }, [])

  useEffect(() => {

    localStorage.setItem(
      "skinCancerChats",
      JSON.stringify(chats)
    )

  }, [chats])

  const createNewChat = () => {

    setCurrentChat(null)

    setPreview(null)

  }

  const deleteChat = (id) => {

    const updatedChats =
      chats.filter(
        chat => chat.id !== id
      )

    setChats(updatedChats)

    if (
      currentChat &&
      currentChat.id === id
    ) {

      if (
        updatedChats.length > 0
      ) {

        setCurrentChat(
          updatedChats[0]
        )

      }

      else {

        setCurrentChat(null)

      }

    }

  }

  const handlePrediction = (
    result
  ) => {

    const newChat = {

      id: Date.now(),

      title:
        result.prediction,

      image:
        preview,

      timestamp:
        new Date()
          .toLocaleString(),

      result

    }

    const updatedChats = [

      newChat,

      ...chats

    ]

    setChats(updatedChats)

    setCurrentChat(
      newChat
    )

  }

  return (

    <div
      className="
      flex
      min-h-screen
      bg-slate-900
      text-white
      "
    >

      <Sidebar
        chats={chats}
        setCurrentChat={
          setCurrentChat
        }
        createNewChat={
          createNewChat
        }
        deleteChat={
          deleteChat
        }
      />

      <div
        className="
        flex-1
        p-8
        "
      >

        <div
          className="
          mb-8
          border-b
          border-slate-800
          pb-4
          "
        >

          <h1
            className="
            text-4xl
            font-bold
            "
          >
            🩺 Skin Cancer AI Assistant
          </h1>

          <p
            className="
            text-slate-400
            mt-2
            "
          >
            AI-powered skin lesion analysis using deep learning.
          </p>

        </div>

        <UploadBox
          setResult={
            handlePrediction
          }
          setLoading={
            setLoading
          }
          setPreview={
            setPreview
          }
        />

        <Conversation
          chat={currentChat}
          loading={loading}
        />

      </div>

    </div>

  )

}

export default App