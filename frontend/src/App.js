import React, {useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [file, setFile] = useState(null);
    
    const UPLOAD_ENDPOINT = 'http://localhost/react-php-file-upload/backend/upload.php';
    
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        //if await is removed, console log will be called before the uploadFile() is executed completely.
        //since the await is added, this will pause here then console log will be called
        let res = await uploadFile(file);
        console.log(res.data);
    }
    
    const uploadFile = async(file) => { 
       const formData = new FormData();        
       formData.append('avatar',file)
        
        return  await axios.post(UPLOAD_ENDPOINT, formData,{
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
    }

    const handleOnChange = (e) => {
        console.log(e.target.files[0]);
        setFile(e.target.files[0]);
    }
  
  return (
    <form onSubmit={handleSubmit}>
        <h1>React File Upload</h1>
        <input type="file" onChange={handleOnChange} />
        <button type="submit">Upload File</button>
    </form>
  );
}

export default App;
