import React, { useCallback,useState } from 'react'
import { useAuthContext } from '../../context/authContext'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { changePassword } from '../../services/userApis';


export default function ChangePassword() {
    const { data, setaData } = useAuthContext();
    const [isLoading, setIsLoding] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const handleChangePass = useCallback(async (data) => {

        if (data.newPassword !== data.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        setIsLoding(true);

        let updatedPassword = await changePassword(data);

        if (updatedPassword.status) {
            toast.success(updatedPassword.message);
            reset();
        } else {
            toast.error(updatedPassword.message);
        }

        setIsLoding(false);
    }, []);


    return (
        <>
            {/* Password */}

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

                <h3 className="text-2xl font-bold mb-8">
                    Change Password
                </h3>
                <form onSubmit={handleSubmit(handleChangePass)}>
                    <div className="space-y-5">

                        <input
                            type="password"
                            placeholder="Current Password"
                            className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 outline-none"
                            {...register("oldPassword", { required: "Old password is required" })}
                        />
                        {errors.oldPassword && <p className="text-red-500">{errors.oldPassword.message}</p>}

                        <input
                            type="password"
                            placeholder="New Password"
                            className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 outline-none"
                            {...register("newPassword", { required: "New password is required" })}
                        />
                        {errors.newPassword && <p className="text-red-500">{errors.newPassword.message}</p>}

                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 outline-none"
                            {...register("confirmPassword", { required: "Confirm password is required" })}
                        />
                        {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}

                        <button
                            disabled={isLoading}
                            className={`px-5 h-14 rounded-2xl font-bold text-sm transition flex items-center justify-center gap-3
                                                ${isLoading
                                    ? "bg-purple-400 cursor-not-allowed"
                                    : "bg-purple-500 hover:bg-purple-400 hover:shadow-xl shadow-purple-500/30"
                                }`}
                        >
                            {isLoading ? (
                                <>
                                    <FaSpinner className="animate-spin text-xl" />
                                    Processing...
                                </>
                            ) : (
                                "Update Password"
                            )}
                        </button>

                    </div>
                </form>
            </div>
        </>
    )
}
