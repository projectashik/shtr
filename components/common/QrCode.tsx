import QRCodeStyling, {
  CornerDotType,
  CornerSquareType,
  DotType,
  DrawType,
  ErrorCorrectionLevel,
  FileExtension,
  Mode,
  Options,
  TypeNumber,
} from "@solana/qr-code-styling";
import { Button } from "components/ui";
import { ChangeEvent, useEffect, useRef, useState } from "react";

const QrCode = ({ url }: { url: string }) => {
  const [options, setOptions] = useState<Options>({
    width: 300,
    height: 300,
    type: "svg" as DrawType,
    margin: 10,
    image: "/favicon.svg",
    qrOptions: {
      typeNumber: 0 as TypeNumber,
      mode: "Byte" as Mode,
      errorCorrectionLevel: "Q" as ErrorCorrectionLevel,
    },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.4,
      margin: 20,
      crossOrigin: "anonymous",
    },
    dotsOptions: {
      color: "#0d9488",
      type: "rounded" as DotType,
    },
    cornersSquareOptions: {
      color: "#0d9488",
      type: "extra-rounded" as CornerSquareType,
    },
    cornersDotOptions: {
      color: "#0d9488",
      type: "dot" as CornerDotType,
    },
  });
  const [fileExt, setFileExt] = useState<FileExtension>("svg");
  const [qrCode] = useState<QRCodeStyling>(new QRCodeStyling(options));
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      qrCode.append(ref.current);
    }
    qrCode.update({
      data: `${window.origin}/${url}`,
    });
  }, [qrCode, ref, url]);

  useEffect(() => {
    if (!qrCode) return;
    qrCode.update(options);
  }, [qrCode, options]);

  const onExtensionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFileExt(event.target.value as FileExtension);
  };

  const onDownloadClick = () => {
    if (!qrCode) return;
    qrCode.download({
      extension: fileExt,
    });
  };
  return (
    <div>
      <div className="flex items-center justify-center" ref={ref}></div>
      <div className="mt-2 flex  space-x-6">
        <select
          className="block w-full rounded-lg border border-gray-300  bg-gray-50 p-2 text-sm text-gray-900 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500 sm:p-2.5 md:text-base"
          onChange={onExtensionChange}
          value={fileExt}
        >
          <option value="png">PNG</option>
          <option value="svg">SVG</option>
          <option value="jpeg">JPEG</option>
          <option value="webp">WEBP</option>
        </select>
        <Button look="alternate" onClick={onDownloadClick}>
          Download
        </Button>
      </div>
    </div>
  );
};

export default QrCode;
