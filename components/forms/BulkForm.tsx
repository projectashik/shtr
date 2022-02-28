import axios from "axios";
import { Input, Modal } from "components/ui";
import { toast } from "lib/toast";
import Papa from "papaparse";
import { BaseSyntheticEvent, useState } from "react";
import { FormattedMessage } from "react-intl";
import { mutate } from "swr";

interface BulkFormProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  mutator: any;
}

const BulkForm = ({ isOpen, setIsOpen, mutator }: BulkFormProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const onFileChange = (e: BaseSyntheticEvent) => {
    setSelectedFile(e.currentTarget.files[0]);
    setError("");
    console.log(e.currentTarget.files[0]);
  };

  const onSubmit = async () => {
    setLoading(true);
    if (selectedFile) {
      Papa.parse(selectedFile, {
        header: true,
        complete: (results: any) => {
          if (results.data.length < 1) {
            setError(
              <FormattedMessage
                id="error.noDataFoundInFile"
                defaultMessage="No data found in the file"
              />
            );
            return false;
          }
          axios
            .post("/api/links/bulk", {
              links: results.data,
            })
            .then((res) => {
              mutate("/api/links");
              mutator && mutator();
              setIsOpen(false);
              toast({
                message: (
                  <FormattedMessage
                    id="label.bulkCreateSuccessfull"
                    defaultMessage="Successfully shorten the valid links from the file"
                  />
                ),
              });
            })
            .catch((e: any) => {
              console.log(e.response.data);
            });
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    } else {
      setError(
        <FormattedMessage
          id="error.fileRequired"
          defaultMessage="The file field is required"
        />
      );
    }
    setLoading(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={
        <FormattedMessage id="label.bulkCreate" defaultMessage="Bulk Create" />
      }
      loading={loading}
      onConfirm={onSubmit}
      confirmText={
        <FormattedMessage id="label.shorten" defaultMessage="Shorten" />
      }
    >
      <div>
        <form
          onSubmit={onSubmit}
          className="dark:border-dark102 flex flex-col gap-2 border-t pt-2"
        >
          <p>Upload CSV file to shorten many links at once.</p>
          <p>
            You can download the sample <strong>csv</strong> file from{" "}
            <a href="/shtr.csv" className="text-primary-600" download>
              here
            </a>
            .
          </p>
          <Input onChange={onFileChange} type="file" id="file" />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </form>
      </div>
    </Modal>
  );
};

export default BulkForm;
