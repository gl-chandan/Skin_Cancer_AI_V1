export default function Sidebar({

  chats,

  setCurrentChat,

  createNewChat,

  deleteChat

}) {

  return (

    <div
      className="
      w-80
      bg-slate-950
      border-r
      border-slate-800
      p-4
      overflow-y-auto
      "
    >

      <button
        onClick={createNewChat}
        className="
        w-full
        bg-blue-600
        hover:bg-blue-700
        p-3
        rounded-lg
        mb-6
        "
      >
        + New Scan
      </button>

      {

        chats.length === 0 && (

          <p
            className="
            text-slate-400
            "
          >
            No conversations yet
          </p>

        )

      }

      {

        chats.map(chat => (

          <div
            key={chat.id}
            onClick={() =>
              setCurrentChat(chat)
            }
            className="
            flex
            gap-3
            items-center
            p-3
            bg-slate-800
            rounded-xl
            mb-3
            cursor-pointer
            hover:bg-slate-700
            "
          >

            <img
              src={chat.image}
              alt=""
              className="
              w-14
              h-14
              object-cover
              rounded-lg
              "
            />

            <div
              className="
              flex-1
              "
            >

              <div
                className="
                font-semibold
                "
              >
                {chat.title}
              </div>

              <div
                className="
                text-xs
                text-slate-400
                "
              >
                {chat.timestamp}
              </div>

            </div>

            <button
              onClick={(e) => {

                e.stopPropagation()

                deleteChat(
                  chat.id
                )

              }}
              className="
              text-red-400
              hover:text-red-300
              "
            >
              ✕
            </button>

          </div>

        ))

      }

    </div>

  )

}