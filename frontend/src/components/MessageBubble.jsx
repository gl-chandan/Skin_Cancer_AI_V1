export default function MessageBubble({

  sender,

  children

}) {

  const isAI =
    sender === "ai"

  return (

    <div
      className={`
      max-w-2xl
      p-4
      rounded-2xl
      ${
        isAI
          ? "bg-slate-800"
          : "bg-blue-600 ml-auto"
      }
      `}
    >

      {children}

    </div>

  )

}