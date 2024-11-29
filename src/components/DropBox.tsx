import { DragEvent } from "react";
import { FileWithOption } from "../types";
import "./DropBox.css";
import { returnPossibleConversions } from "../utils";
interface Props {
  setFiles: (value: FileWithOption[]) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}
export const DropBox = ({ setFiles, inputRef }: Props) => {
  const handleOnDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFiles = e.dataTransfer.files
      ? Array.from(e.dataTransfer.files)
      : [];
    const droppedFilesWithConversion = droppedFiles.map((file) => ({
      file,
      convertTo: returnPossibleConversions(file.type)![0],
    }));
    setFiles(droppedFilesWithConversion);
  };
  const handleOnDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleOnDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleOnClick = () => {
    inputRef.current?.click();
  };
  return (
    <div
      className="dropbox"
      onClick={handleOnClick}
      onDrop={handleOnDrop}
      onDragEnter={handleOnDragEnter}
      onDragOver={handleOnDragOver}
    >
      <span>Drop files here</span>
      <span>or</span>
      <span>Click here to upload</span>
    </div>
  );
};

export default DropBox;
