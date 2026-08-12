import diseaseInfo from "../data/diseaseInfo"
import MessageBubble from "./MessageBubble"
import ReactMarkdown from "react-markdown"
export default function AIResponse({
  result
}) {

  if (!result)
    return null

  const info =
    diseaseInfo[
      result.prediction
    ]

  return (

    <div
      className="
      flex
      flex-col
      gap-4
      "
    >

      <MessageBubble sender="ai">

        🤖 Diagnosis:

        {" "}

        {info.name}

      </MessageBubble>

      <MessageBubble sender="ai">

        🤖 Confidence:

        {" "}

        {result.confidence}%

      </MessageBubble>

      <MessageBubble sender="ai">

        🤖 Risk Level:

        {" "}

        {info.risk}

      </MessageBubble>

      <MessageBubble sender="ai">

        🤖 Standard Medical Information

        <br />
        <br />

        {info.description}

      </MessageBubble>

      <MessageBubble sender="ai">

        🤖 AI Medical Explanation

        <br />
        <br />

        <ReactMarkdown>
        {result.ai_explanation}
        </ReactMarkdown>

      </MessageBubble>

    </div>

  )

}