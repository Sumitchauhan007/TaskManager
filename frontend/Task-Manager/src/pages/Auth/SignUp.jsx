import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import Input from '../../components/inputs/Input';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/UserContext';
import uploadImage from '../../utils/uploadImage';


const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminInviteTokens, setAdminInviteTokens] = useState("");

  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext)
  const navigate = useNavigate();

  //handle Signup form submit for the user
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = ''

    if (!fullName) {
      setError("Please enter your full name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }

    if (!password) {
      setError("Please enter a password");
      return;
    }

    setError("");

    //signup api call
    try {
      //upload image if

      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
        adminInviteToken: adminInviteTokens
      });

      const { token, role } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data)

        //redirect based on role
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try agian.");
      }
    }

  };
  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-2xl font-bold text-white/95 mb-1'>Create an Account</h3>
        <p className='text-xs text-white/45 mt-[5px] mb-6 font-medium'>
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="John Wick"
              type="text"
            />
            <Input value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email"
              placeholder="john@example.com"
              type="text" />

            <Input value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="Min 6 characters"
              type="password" />

            <Input value={adminInviteTokens}
              onChange={({ target }) => setAdminInviteTokens(target.value)}
              label="Admin Invite Token"
              placeholder="6 Digit Code"
              type="text" />
          </div>

          {error && <p className='text-red-400 text-xs pb-2.5 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2'>{error}</p>}

          <button type='submit' className='btn-primary mt-2'>SIGN UP</button>
          <p className='text-[13px] text-white/45 mt-3'>
            Already have an account?{" "}
            <Link className='font-semibold text-blue-400 hover:text-blue-300 transition-colors' to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default SignUp;
