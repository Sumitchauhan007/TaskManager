import React, { useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminInviteTokens, setAdminInviteTokens] = useState("");

  const [error, setError] = useState(null);
  return (
    <AuthLayout>
      <div className=''>
        <h3 className=''>Create an Account</h3>
        <p className=''>
          Join us today by entering your details below.
        </p>
      </div>
    </AuthLayout>
  )
}

export default SignUp