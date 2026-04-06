import {useRef, useState} from 'react';
import useForm from '../hooks/formHooks';
import {useFile, useMedia, useTags} from '../hooks/apiHooks';
import {Button} from '../components/ui/button';
import Footer from '@/components/Footer';
import {useTranslation} from 'react-i18next';

// helpers are implemented in utils/uploadHelpers.ts
import {normalizeTagNames, validateForm} from '../utils/uploadHelpers';

const Upload = () => {
  const {t} = useTranslation();
  const token = localStorage.getItem('token') || '';
  const [uploading, setUploading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const {postFile} = useFile();
  const {postMedia} = useMedia(token);
  const {postTag} = useTags();
  const fileRef = useRef<HTMLInputElement | null>(null);

  const initValues = {title: '', description: '', tags: ''};

  const isFormValid = () => validateForm(file, inputs.title, inputs.tags);

  const doUpload = async () => {
    const token = localStorage.getItem('token');
    if (!file || !token) {
      console.log('doUpload file or token falsy');
      return;
    }
    setUploading(true);
    try {
      const uploadResponse = await postFile(file, token);
      console.log('file upload response', uploadResponse);
      const mediaResponse = await postMedia(uploadResponse, inputs, token);
      console.log('postMedia response', mediaResponse);

      // send tags one by one after media gets an id
      const tagNames = normalizeTagNames(inputs.tags);
      if (tagNames.length) {
        const mediaId = mediaResponse.media.media_id;
        await Promise.all(
          tagNames.map((tagName) =>
            postTag(tagName, mediaId, token).catch((err) => {
              console.error('tag post failed', tagName, err);
            }),
          ),
        );
      }

      // reset form (or redirect to home view)
      resetForm();
    } catch (error) {
      console.log((error as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const {handleInputChange, handleSubmit, inputs, setInputs} = useForm(
    doUpload,
    initValues,
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.files);
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const resetForm = () => {
    setInputs(initValues);
    setFile(null);
    console.log(fileRef.current?.value);
    if (fileRef.current) {
      fileRef.current.value = '';
    }
  };

  return (
    <>
      <h1 className="text-center text-2xl font-semibold">{t('lataa')}</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-card text-card-foreground mx-auto mt-4 flex w-full max-w-2xl flex-col gap-4 rounded-md p-6 shadow"
      >
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold" htmlFor="title">
            {t('otsikko')}
          </label>
          <input
            className="border-input bg-background text-foreground focus:border-ring focus:ring-ring rounded-md border px-3 py-2 transition outline-none focus:ring-2"
            name="title"
            type="text"
            id="title"
            onChange={handleInputChange}
            value={inputs.title}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold" htmlFor="description">
            {t('kuvaus')}
          </label>
          <textarea
            className="border-input bg-background text-foreground focus:border-ring focus:ring-ring rounded-md border px-3 py-2 transition outline-none focus:ring-2"
            name="description"
            rows={5}
            id="description"
            onChange={handleInputChange}
            value={inputs.description}
          ></textarea>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold" htmlFor="tags">
            {t('hakusanat')}
          </label>
          <input
            className="border-input bg-background text-foreground focus:border-ring focus:ring-ring rounded-md border px-3 py-2 transition outline-none focus:ring-2"
            name="tags"
            type="text"
            id="tags"
            onChange={handleInputChange}
            value={inputs.tags}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold" htmlFor="file">
            {t('tiedosto')}
          </label>
          <input
            className="text-muted-foreground file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:px-4 file:py-2 file:font-semibold"
            name="file"
            type="file"
            id="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
            ref={fileRef}
          />
        </div>
        <img
          className="mx-auto h-48 w-48 rounded-md object-cover"
          src={
            file
              ? URL.createObjectURL(file)
              : 'https://placehold.co/320x240?text=Choose+image'
          }
          alt="preview"
          width="200"
        />
        <Button
          className="w-full font-semibold"
          type="submit"
          disabled={!isFormValid()}
        >
          {t('lataa')}
        </Button>
      </form>
      <div className="mx-auto mt-4 w-full max-w-2xl">
        <Button
          variant="outline"
          className="w-full font-semibold"
          onClick={resetForm}
        >
          {t('tyhjennä')}
        </Button>
      </div>

      {uploading && (
        <p className="text-foreground mt-3 text-center font-semibold">
          Uploading...
        </p>
      )}
      <Footer />
    </>
  );
};

export default Upload;
