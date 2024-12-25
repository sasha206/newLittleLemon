import { FileUploader } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles.css';

const About = () => {
  return (
    <FileUploader
      acceptedFileTypes={['image/*']}
      path="public/"
      autoUpload={false}
      maxFileCount={1}
      isResumable
    />
  );
};
export default About;