import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile)=> {
    const formData = new FormData();
    //apennd image file to form data
    formData.append('image', imageFile);

    try {
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE,formData , {
            headers: {
                'Content-Type': 'multiple/form-data',// set header for file upload
            },
            
        });
        return response.data;//return re4sponse
    } catch (error) {
        console.error('Error uploading the image: ', error);
    }
};

export default uploadImage;