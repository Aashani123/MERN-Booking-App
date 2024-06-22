import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from '../api-client'
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {

  const navigate = useNavigate();
  const{showToast} =useAppContext();
  const { register, watch, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: ()=> {
      showToast({message: "Registration success", type:"Success"})
      navigate("/");
    },

    onError: (error:Error) => {
showToast({message:"Registration failed", type:"Error"})    }
  })

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Create an account</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("firstName", { required: "This field is required" })}
            type="text"
            id="firstname"
          />
          {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName.message}</span>}
        </label>

        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("lastName", { required: "This field is required" })}
            type="text"
            id="lastname"
          />
          {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName.message}</span>}
        </label>
      </div>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "This field is required" })}
          type="email"
          id="email"
        />
        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
      </label>

      <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password should be with 6 or more characters"
            }
          })}
          type="password"
          id="password"
        />
        {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
      </label>

      <label className="text-gray-700 text-sm font-bold flex-1">
        Confirm Password
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("confirmPassword", {
            required: "This field is required",
            validate: (val) => {
              if (!val) {
                return "This field is required";
              } else if (watch("password") !== val) {
                return "Your passwords don't match";
              }
            }
          })}
          type="password"
          id="confirmpassword"
        />
        {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}
      </label>

      <span>
        <button type="submit" className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl">
          Create Account
        </button>
      </span>
    </form>
  );
};

export default Register;
