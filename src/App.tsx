import "./App.css";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FileWithOption } from "./types";
import { FilesWithSelection } from "./components/FilesWithSelection";
import DropBox from "./components/DropBox";
import { returnPossibleConversions } from "./utils";

function App() {
  const [files, setFiles] = useState<FileWithOption[]>();
  const inputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const uploadedFiles = e.currentTarget.files
      ? Array.from(e.currentTarget.files)
      : [];
    const uploadedFilesWithConversion = uploadedFiles.map((file) => ({
      file,
      convertTo: returnPossibleConversions(file.type)![0],
    }));
    setFiles(uploadedFilesWithConversion);
  };
  const handleOptionChange = (index: number, convertTo: string) => {
    setFiles((prevFiles) =>
      prevFiles!.map((fileWithOption, i) =>
        i === index ? { ...fileWithOption, convertTo } : fileWithOption
      )
    );
  };
  useEffect(() => {
    if (files) {
      console.log(files);
    }
  }, [files]);
  return (
    <>
      <form className="group">
        <h1>Transform</h1>
        <DropBox inputRef={inputRef} setFiles={setFiles} />
        <input
          onChange={handleFileChange}
          ref={inputRef}
          type="file"
          name="uploads"
          id="uploads"
          accept=".jpg, .jpeg, .pdf"
          multiple
        />
        {files && files.length != 0 ? (
          <p>{files.length} selected</p>
        ) : (
          <p>No files selected</p>
        )}
        <FilesWithSelection
          files={files}
          handleOptionChange={handleOptionChange}
        />
      </form>
    </>
  );
}

export default App;
