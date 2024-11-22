import "./App.css";
import { useEffect, useRef, useState } from "react";
import { returnFileSize } from "./utils";
function App() {
  const [files, setFiles] = useState<FileList | null>();
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (files) {
      console.log(files);
    }
  }, [files]);
  const unMappedFiles = () => {
    if (files) {
      const mappedFiles = [];
      for (const file of files) {
        mappedFiles.push(
          <li key={file.name}>
            {file.name}, {returnFileSize(file.size)}
          </li>
        );
      }
      return mappedFiles;
    }
  };
  return (
    <>
      <div className="group">
        <h1>Transform</h1>
        <label htmlFor="uploads" className="custom-file-upload">
          Upload a file
        </label>
        <input
          onChange={(e) => setFiles(e.currentTarget.files)}
          ref={ref}
          type="file"
          name="uploads"
          id="uploads"
          accept="image/*"
          multiple
        />
        {files && files.length != 0 ? (
          <p>{files.length} selected</p>
        ) : (
          <p>No files selected</p>
        )}
        <ul className="files-preview">{unMappedFiles()}</ul>
      </div>
    </>
  );
}

export default App;
