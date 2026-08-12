import {
  useEffect,
  useRef
} from "react"

import AIResponse from "./AIResponse"
import TypingBubble from "./TypingBubble"

export default function Conversation({

  chat,

  loading

}) {

  const bottomRef =
    useRef(null)

  useEffect(() => {

    bottomRef.current
      ?.scrollIntoView({
        behavior: "smooth"
      })

  }, [chat, loading])

  if (!chat && !loading) {

    return (

      <div
        className="
        flex
        items-center
        justify-center
        h-[60vh]
        text-slate-400
        text-xl
        "
      >

        Upload a skin lesion image
        to begin analysis.

      </div>

    )

  }

  return (

    <div
      className="
      h-[65vh]
      overflow-y-auto
      mt-6
      pr-2
      "
    >

      {

        loading && (

          <TypingBubble />

        )

      }

      {

        chat && (

          <>

            <div
              className="
              bg-blue-600
              p-4
              rounded-2xl
              ml-auto
              w-fit
              mb-6
              "
            >

              <p
                className="
                mb-3
                "
              >
                Analyze this lesion
              </p>

              <img
                src={chat.image}
                alt=""
                className="
                w-64
                h-64
                object-cover
                rounded-xl
                "
              />

            </div>

            <AIResponse
              result={
                chat.result
              }
            />

          </>

        )

      }

      <div ref={bottomRef} />

    </div>

  )

}