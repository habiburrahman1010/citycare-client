import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import UseAuth from '../../../hooks/UseAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registereUser, updateUserProfile } = UseAuth();

    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const [loading, setLoading] = useState(false);

    const handleRegister = async (data) => {
        try {
            setLoading(true);

            const photoFile = data.photo[0];

            // create firebase user
            const result = await registereUser(data.email, data.password);

            // upload image
            const formData = new FormData();
            formData.append('image', photoFile);

            const imageApiUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST}`;
            const imageRes = await axios.post(imageApiUrl, formData);

            const photoURL = imageRes.data.data.url;

            // save user in DB
            const userInfo = {
                email: data.email,
                displayName: data.name,
                photoURL,
            };

            const dbRes = await axiosSecure.post('/users', userInfo);

            if (dbRes.data.insertedId || dbRes.data.message === 'user exists') {
                console.log('User saved in DB');
            }

            // update firebase profile
            await updateUserProfile({
                displayName: data.name,
                photoURL,
            });

            navigate(location?.state || '/');
        } catch (error) {
            console.error(error);
            alert('Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl mt-14">
            <h4 className='text-2xl font-extrabold px-8'>Create an Account</h4>
            <p className='px-8'>Register with City Care</p>

            <form className="card-body" onSubmit={handleSubmit(handleRegister)}>
                <fieldset className="fieldset">

                    {/* photo */}
                    <label className="label">Your Photo</label>
                    <input type="file" className="file-input" {...register('photo', { required: true })} />
                    {errors.photo && <p className='text-red-500'>Photo is required</p>}

                    {/* name */}
                    <label className="label">Your Name</label>
                    <input type="text" className="input" {...register('name', { required: true })} />
                    {errors.name && <p className='text-red-500'>Name is required</p>}

                    {/* email */}
                    <label className="label">Email</label>
                    <input type="email" className="input" {...register('email', { required: true })} />
                    {errors.email && <p className='text-red-500'>Email is required</p>}

                    {/* password */}
                    <label className="label">Password</label>
                    <input
                        type="password"
                        className="input"
                        {...register('password', {
                            required: true,
                            minLength: 6,
                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).+$/
                        })}
                    />
                    {errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>}
                    {errors.password?.type === 'minLength' && <p className='text-red-500'>Minimum 6 characters</p>}
                    {errors.password?.type === 'pattern' && <p className='text-red-500'>Upper, lower & special required</p>}

                    <button disabled={loading} className="btn btn-primary mt-4">
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </fieldset>

                <p>
                    Already have an account?{' '}
                    <Link state={location.state} to={'/login'} className='text-primary'>Login</Link>
                </p>
            </form>

            <SocialLogin />
        </div>
    );
};

export default Register;
