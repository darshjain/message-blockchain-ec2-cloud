import React, { useState } from 'react'

function App() {
  const [selectedFile, setSelectedFile] = useState(null)

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const handleUpload = () => {
    const formData = new FormData()
    formData.append('file', selectedFile)

    fetch('http://3.109.46.177:3000/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <div>
      <input type="file" onChange={ handleFileChange } />
      <button onClick={ handleUpload }>Upload</button>
    </div>
  )
}

export default App
