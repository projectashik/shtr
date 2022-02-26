import axios from "axios";
import Papa from "papaparse";
import { BaseSyntheticEvent, useState } from "react";

const BulkPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const onFileChange = (event: BaseSyntheticEvent) => {
    const file = event.currentTarget.files[0];
    setSelectedFile(file);

    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results: any) => {
          if (results.data.length < 1) {
            return alert("No data found in the file");
          }
          axios
            .post("/api/links/bulk", {
              links: results.data,
            })
            .then((res) => {
              console.log(res);
            })
            .catch((e: any) => {
              console.log(e.response.data);
            });
        },
        error: (err: any) => {
          console.log(err);
        },

        // make url header required
      });
    }
  };
  return (
    <div>
      {selectedFile && (
        <div>
          <p>{selectedFile.name}</p>
          <p>{selectedFile.size}</p>
        </div>
      )}
      {/* input that accept csv, and other spreadsheet sheets */}
      <input type="file" onChange={onFileChange} accept="text/csv" />
    </div>
  );
};

export default BulkPage;
