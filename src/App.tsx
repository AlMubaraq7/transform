import "./App.css";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import DropBox from "./components/DropBox";
import { returnFileSize } from "./utils";
function App() {
  const [files, setFiles] = useState<FileList | null>();
  const inputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFiles(e.currentTarget.files);
  };
  useEffect(() => {
    if (files) {
      console.log(files);
    }
  }, [files]);
  const FilesList = () => {
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
        <DropBox inputRef={inputRef} setFiles={setFiles} />
        <input
          onChange={handleFileChange}
          ref={inputRef}
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
        <ul className="files-preview">{FilesList()}</ul>
      </div>
    </>
  );
}

export default App;
