import { Amplify } from 'aws-amplify';
import outputs from '../../../amplify_outputs.json';
import { useState } from 'react';
import { uploadData } from 'aws-amplify/storage';

Amplify.configure(outputs);

const About = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file before uploading.');
      return;
    }

    try {
      const result = await uploadData({
        path: `picture-submissions/${file.name}`,
        data: file,
      });
      console.log('Upload successful:', result);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default About;

