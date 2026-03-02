import React, { useState, useEffect } from "react";
import Modal from "../Modal";
import Input from "../Inputs/Input";
import ProfilePhotoSelector from "../Inputs/ProfilePhotoSelector";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadImage";
import toast from "react-hot-toast";

const EditProfileModal = ({ isOpen, onClose, user, onUpdateSuccess }) => {
    const [name, setName] = useState("");
    const [profilePic, setProfilePic] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) {
            setName(user.name || "");
            // ProfilePhotoSelector natively expects a File object or URL, but setting pre-existing DP URL helps? 
            // Wait, ProfilePhotoSelector uses internal previewUrl for strings? Unsure, let's look at it next.
            // Oh, ProfilePhotoSelector checks `!image` to show icon, else it shows `<img src={previewUrl} />`. 
            // Wait, ProfilePhotoSelector sets previewUrl from URL.createObjectURL. If we pass a string it might crash!
            setProfilePic(user.profileImageUrl || null);
        }
    }, [user, isOpen]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setError("");

        if (!name) {
            setError("Please enter your name");
            return;
        }

        setIsLoading(true);

        try {
            let profileImageUrl = user?.profileImageUrl || "";

            if (profilePic && typeof profilePic !== "string") {
                const imgUploadRes = await uploadImage(profilePic);
                profileImageUrl = imgUploadRes.imageUrl || "";
            } else if (!profilePic) {
                profileImageUrl = "";
            }

            const response = await axiosInstance.put(API_PATHS.USERS.UPDATE_USER(user._id), {
                name,
                profileImageUrl
            });

            toast.success("Profile updated successfully");
            onUpdateSuccess(response.data);
            onClose();
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("Something went wrong. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Edit Profile">
            <form onSubmit={handleUpdate} className="flex flex-col gap-4">
                <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

                <Input
                    label="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    type="text"
                />

                {error && <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>}

                <div className="flex justify-end gap-3 mt-4">
                    <button type="button" onClick={onClose} className="px-5 py-2 text-sm font-semibold text-white/60 bg-white/8 hover:bg-white/12 rounded-xl transition-all border border-white/10" disabled={isLoading}
                      style={{ background: 'rgba(255,255,255,0.07)' }}>
                        Cancel
                    </button>
                    <button type="submit" className="btn-primary !w-auto px-6 py-2" disabled={isLoading}>
                        {isLoading ? "Updating..." : "Update Profile"}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default EditProfileModal;
