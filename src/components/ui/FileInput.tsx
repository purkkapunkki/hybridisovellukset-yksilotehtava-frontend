import React, {useRef} from 'react';
import {Button} from './button';
import {useTranslation} from 'react-i18next';

interface FileInputProps {
  file: File | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput = ({file, onFileChange}: FileInputProps) => {
  const {t} = useTranslation();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div>
      <Button onClick={() => fileInputRef.current?.click()}>
        {t('select file')}
      </Button>
      {file?.name && <p>{t('file selected', {filename: file.name})}</p>}

      <input
        type="file"
        accept="image/*,video/*"
        id="input-file"
        onChange={onFileChange}
        style={{display: 'none'}}
        ref={fileInputRef}
      />
    </div>
  );
};

export default FileInput;
