import React from 'react';
import { useForm } from 'react-hook-form';
import UseAuth from '../../../hooks/UseAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';


const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { signInUser } = UseAuth();

    const location =useLocation();
    const navigate=useNavigate();
    //console.log('login page',location)


    const handleLogin = (data) => {

        console.log('afterlogin', data);

        signInUser(data.email, data.password)
            .then(result => {
                console.log(result.user)
                navigate(location?.state || '/')
            })
            .catch(error => {
                console.log(error)
            })

    }
    return (
        <div>


            <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl mt-24">

                <h4 className='text-4xl font-extrabold px-8'>Welcome Back</h4>
                <p className='px-8'>Login with ZapShift</p>
                <form onSubmit={handleSubmit(handleLogin)} className="card-body">
                    <fieldset className="fieldset">

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
                        <button className="btn btn-neutral mt-4">Login</button>

                        <p>Dont have an account? <Link state={location.state} to={'/register'} className='text-primary'>register</Link></p>
                    </fieldset>

                  
                </form>
                  <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default Login;