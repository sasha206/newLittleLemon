import { FileUploader } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles.css';
import { StorageImage } from '@aws-amplify/ui-react-storage';

const About = () => {
  return (
    <div>
      <FileUploader
      acceptedFileTypes={['image/*']}
      path="public/"
      autoUpload={false}
      maxFileCount={3}
      isResumable
    />
    <StorageImage alt="image" path="public/Facebook_Logo_Primary.png"/>
    </div>

  );
};
export default About;