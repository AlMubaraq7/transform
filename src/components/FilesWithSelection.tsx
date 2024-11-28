import { conversionOptions } from "../constants";
import { FileWithOption } from "../types";
import { returnFileSize } from "../utils";

interface FilesWithSelectionProps {
  files: FileWithOption[] | undefined;
  handleOptionChange: (index: number, value: string) => void;
}
export const FilesWithSelection = ({
  files,
  handleOptionChange,
}: FilesWithSelectionProps) => {
  return (
    <ul>
      {files &&
        files.map(({ file, convertTo }, index) =>
          file instanceof File ? (
            <li key={index}>
              <span>
                {file.name}, {returnFileSize(file.size)}
              </span>
              <select
                value={convertTo}
                onChange={(e) =>
                  handleOptionChange(index, e.currentTarget.value)
                }
              >
                {conversionOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </li>
          ) : (
            <span key={index}>This is not a valid File instance.</span>
          )
        )}
    </ul>
  );
};
