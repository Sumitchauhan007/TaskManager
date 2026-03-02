import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(typeof image === 'string' ? image : null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            //update the image state
            setImage(file);

            //generate preview url from the file
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    };

    React.useEffect(() => {
        if (typeof image === 'string') {
            setPreviewUrl(image);
        } else if (image === null) {
            setPreviewUrl(null);
        }
    }, [image]);

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };
    return <div className="flex justify-center mb-6">
        <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={handleImageChange}
            className="hidden"
        />

        {!image ? (
            <div
              className="w-20 h-20 flex items-center justify-center rounded-2xl relative cursor-pointer"
              style={{ background: 'rgba(0,122,255,0.15)', border: '2px dashed rgba(0,122,255,0.3)' }}
            >
                <LuUser className="text-4xl text-blue-400" />

                <button type="button"
                    className="w-8 h-8 flex items-center justify-center text-white rounded-xl absolute -bottom-1 -right-1 cursor-pointer"
                    style={{ background: 'linear-gradient(135deg, #007AFF, #0056CC)', boxShadow: '0 4px 12px rgba(0,122,255,0.4)' }}
                    onClick={onChooseFile}>
                    <LuUpload className="text-sm" />
                </button>
            </div>
        ) : (
            <div className="relative">
                <img
                    src={previewUrl}
                    alt="profile photo"
                    className="w-20 h-20 rounded-2xl object-cover border-2"
                    style={{ borderColor: 'rgba(255,255,255,0.2)' }}
                />
                <button type="button"
                    className="w-8 h-8 flex items-center justify-center text-white rounded-xl absolute -bottom-1 right-1"
                    style={{ background: 'linear-gradient(135deg, #FF3B30, #cc2020)', boxShadow: '0 4px 12px rgba(255,59,48,0.4)' }}
                    onClick={handleRemoveImage}
                >
                    <LuTrash className="text-sm" />
                </button>
            </div>
        )}
    </div>

};

export default ProfilePhotoSelector;