import { useState } from "react"
import axios from "axios"

export default function UploadBox({

  setResult,

  setLoading,

  setPreview

}) {

  const [file, setFile] =
    useState(null)

  const handleFileChange = (e) => {

    const selectedFile =
      e.target.files[0]

    if (!selectedFile) return

    setFile(selectedFile)

    setPreview(
      URL.createObjectURL(
        selectedFile
      )
    )

  }

  const handleUpload = async () => {

    if (!file) {

      alert(
        "Please select an image"
      )

      return

    }

    const formData =
      new FormData()

    formData.append(
      "file",
      file
    )

    try {

      setLoading(true)

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/predict`,
            formData
        );

      setResult(
        response.data
      )

    }

    catch (error) {

      console.error(error)

      alert(
        "Prediction failed"
      )

    }

    finally {

      setLoading(false)

    }

  }

  return (

    <div
      className="
      bg-slate-800
      border
      border-slate-700
      p-6
      rounded-2xl
      mb-6
      "
    >

      <input
        type="file"
        accept="image/*"
        onChange={
          handleFileChange
        }
        className="
        w-full
        text-white
        "
      />

      <button
        onClick={handleUpload}
        className="
        w-full
        mt-4
        bg-blue-600
        hover:bg-blue-700
        text-white
        py-3
        rounded-xl
        transition
        "
      >
        Analyze Image
      </button>

    </div>

  )

}