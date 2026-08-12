export default function PredictionCard({ result }) {

  if (!result) return null

  return (
    <div className="mt-6 bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">

      <h2 className="text-2xl font-bold mb-4">
        Prediction Result
      </h2>

      <p className="text-lg">
        Disease:
        <span className="ml-2 font-bold">
          {result.prediction}
        </span>
      </p>

      <p className="text-lg mt-2">
        Confidence:
        <span className="ml-2 font-bold">
          {result.confidence}%
        </span>
      </p>

    </div>
  )
}