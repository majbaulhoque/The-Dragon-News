import { Link } from "react-router-dom";
import NavBar from "../Shared/Nav Bar/NavBar";
import { useContext, useState } from "react";
import { AuthContext } from "../../Component/Provider/ContextAuthProvider";

const Register = () => {
    const [success, setSuccess] = useState('');
    const [invalid, setInvalid] = useState('');

    const {createUser} = useContext(AuthContext)

    const handleFormRegister = e => {
        e.preventDefault()
        const form = new FormData(e.currentTarget);
        const name = form.get('name');
        const email = form.get('email');
        const password = form.get('password');
        const terms = form.get('terms')
        console.log(name, email, password, terms)

        setSuccess('');
        setInvalid('');

        // ! Create User
        createUser(email, password)
        .then(result =>{
            console.log(result.user)
            setSuccess("Account created successfully.")
            e.target.reset()
        })
        .catch(error =>{
            console.log(error)
            setInvalid(error.message)
            e.target.reset()
        })
    }
    return (
        <div>
            <NavBar></NavBar>
            <div className="max-w-5xl mx-auto">
                <h3 className="text-center mt-3 py-5 text-3xl font-semibold border-b">Create Your Account</h3>
                <form onSubmit={handleFormRegister} className="card-body mx-auto md:w-3/4 lg:w-1/2">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name="name" placeholder="Name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name="email" placeholder="Email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" name="password" placeholder="Password" className="input input-bordered" required />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div>
                        <input className="mr-2" type="checkbox" name="" id="terms" />
                        <label htmlFor="terms">Accept Term & Conditions</label>
                    </div>
                    <div className="form-control mt-4">
                        <button className="btn bg-gray-700 text-white hover:text-black font-bold">Register</button>
                    </div>
                    {
                        success && <p className="text-green-500">{success}</p>
                    }
                    {
                        invalid && <p className="text-red-600">{invalid}</p>
                    }
                </form>
                <p className="text-center">Already Have An Account ? <Link className="text-blue-600" to='/login'>Login</Link></p>
            </div>
        </div>
    );
};

export default Register;