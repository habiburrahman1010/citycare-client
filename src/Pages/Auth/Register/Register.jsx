import React from 'react';
import { useForm } from 'react-hook-form';
import UseAuth from '../../../hooks/UseAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import axios from 'axios';

const Register = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { registereUser,updateUserProfile } = UseAuth()

    const location =useLocation();
    const navigate=useNavigate();

    const handleRegister = (data) => {
        console.log('after register', data);

        const phofileImage=data.photo[0];

        registereUser(data.email, data.password)
            .then(result => {
                console.log(result.user)

                const formData= new FormData();
                formData.append('image',phofileImage)

                const imag_Api_URL=`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST}`

                axios.post(imag_Api_URL,formData)
                .then(res=>{
                    console.log('after image upload', res.data.data.url)

                    //update profile

                    const userProfile={
                        displayName: data.name,
                        photoURL:res.data.data.url

                    }

                    updateUserProfile(userProfile)
                    .then(()=>{
                        console.log('user profile update done')

                        navigate(location?.state || '/')
                    })
                    .catch(error=>{
                        console.log(error)
                    })
                })
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl mt-14">

            <h4 className='text-2xl font-extrabold px-8'>Create an Account</h4>
            <p className='px-8'>Register with City Care</p>
            <form className="card-body" onSubmit={handleSubmit(handleRegister)} >
                <fieldset className="fieldset">

                    {/* photo */}
                    <label className="label">Your Photo</label>
                    <input type="file" className="file-input" {...register('photo', { required: true })} placeholder="Photo" />
                    {errors.email?.type === 'required' && <p className='text-red-500'>Photo is required</p>}
                    
                    
                    {/* ----------------name--------- */}
                    <label className="label">Your Name</label>
                    <input type="text" className="input" {...register('name', { required: true })} placeholder="Name" />
                    {errors.email?.type === 'required' && <p className='text-red-500'>Name is required</p>}


                    {/* ----------------email----------- */}
                    <label className="label">Email</label>
                    <input type="email" className="input" {...register('email', { required: true })} placeholder="Email" />
                    {errors.email?.type === 'required' && <p className='text-red-500'>email is required</p>}

                    <label className="label">Password</label>
                    <input type="password" className="input" {...register('password', {
                        required: true, minLength: 6, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).+$/
                    })} placeholder="Password" />
                    {errors.password?.type === 'required' && <p className='text-red-500'>pasword is required</p>}
                    {errors.password?.type === 'minLength' && <p className='text-red-500'>password must be 6 charecter or avobe</p>}
                    {errors.password?.type === 'pattern' && <p className='text-red-500'>password must be one upper one lower and one special charecter</p>}

                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-primary  mt-4">Register</button>
                </fieldset>
                <p>Dont have an account? <Link state={location.state} to={'/login'} className='text-primary'>login</Link></p>
            </form>

            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Register;