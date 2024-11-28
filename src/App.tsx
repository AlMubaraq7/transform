import "./App.css";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FileWithOption } from "./types";
import { FilesWithSelection } from "./components/FilesWithSelection";
import DropBox from "./components/DropBox";

function App() {
  // const [files, setFiles] = useState<FileList | null>();
  const [files, setFiles] = useState<FileWithOption[]>();
  const inputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const uploadedFiles = e.currentTarget.files
      ? Array.from(e.currentTarget.files)
      : [];
    const uploadedFilesWithConversion = uploadedFiles.map((file) => ({
      file,
      convertTo: "JPG",
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
  // const FilesList = () => {
  //   if (files) {
  //     const mappedFiles = [];
  //     for (const file of files) {
  //       mappedFiles.push(
  //         <li key={file.name}>
  //           {file.name}, {returnFileSize(file.size)}
  //         </li>
  //       );
  //     }
  //     return mappedFiles;

  // };
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
        <FilesWithSelection
          files={files}
          handleOptionChange={handleOptionChange}
        />
      </div>
    </>
  );
}

export default App;
