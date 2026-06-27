import { useEffect, useState } from "react";
import {
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaGlobe,
    FaEdit,
    FaCalendarAlt,
    FaTicketAlt,
    FaCamera,
    FaSpinner,
} from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../../context/authContext";
import { uploadUserProfile, updateUserInfo } from "../../services/userApis";

const Profile = () => {
    const { data, setData } = useAuthContext();
    const isAdmin = data?.user?.role === "admin";
    const [previewImage, setPreviewImage] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm();

    useEffect(() => {
        return () => {
            if (previewImage) {
                URL.revokeObjectURL(previewImage);
            }
        };
    }, [previewImage]);

    const onProfileImageSubmit = async ({ profileImage }) => {
        const image = profileImage?.[0];

        if (!image) return;

        const localPreview = URL.createObjectURL(image);
        setPreviewImage((currentPreview) => {

            if (currentPreview) {
                URL.revokeObjectURL(currentPreview);
            }

            return localPreview;
        });

        const formData = new FormData();
        formData.append("image", image);

        const response = await uploadUserProfile(formData);

        if (response?.status) {
            const responseData = response?.data;
            const nextImage =
                responseData?.image ??
                responseData?.image

            if (typeof nextImage === "string") {
                setData((currentData) => ({
                    ...currentData,
                    user: {
                        ...currentData.user,
                        ...(typeof responseData === "object" ? responseData ?? responseData : {}),
                        image: nextImage,
                    },
                }));
            }
        }

        reset();
    };

    const imageInput = register("profileImage", {
        required: "Please choose an image.",
        validate: {
            imageType: (files) =>
                !files?.[0] ||
                files[0].type.startsWith("image/") ||
                "Only image files are allowed.",
        },
        onChange: () => {
            handleSubmit(onProfileImageSubmit)();
        },
    });

    return (
        <div className="space-y-8">
            {/* Cover Section */}

            <div className="relative overflow-hidden rounded-3xl border border-white/10">
                <div className="h-56 bg-linear-to-r from-cyan-500 via-blue-500 to-purple-600" />

                <div className="absolute inset-0 bg-black/20" />

                <div className="absolute bottom-0 mb-2 left-8 flex items-end gap-6">
                    <form onSubmit={handleSubmit(onProfileImageSubmit)}>
                        <label className="group relative block w-32 h-32 cursor-pointer overflow-hidden rounded-3xl border-4 border-slate-950 bg-slate-900">
                            <img
                                src={previewImage ?? data?.user?.image ?? "https://i.pravatar.cc/150?img=32"}
                                alt="Profile"
                                className="w-full h-full object-cover transition duration-300 group-hover:scale-105 group-hover:opacity-70"
                            />

                            <input
                                type="file"
                                accept="image/*"
                                className="sr-only"
                                {...imageInput}
                            />

                            <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-slate-950/70 text-white opacity-0 transition duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
                                {isSubmitting ? (
                                    <FaSpinner className="text-2xl animate-spin" />
                                ) : (
                                    <FaCamera className="text-2xl" />
                                )}
                                <span className="text-sm font-semibold">
                                    {isSubmitting ? "Uploading..." : "Upload Photo"}
                                </span>
                            </span>
                        </label>

                        {errors.profileImage && (
                            <p className="mt-2 max-w-32 text-xs font-medium text-red-300">
                                {errors.profileImage.message}
                            </p>
                        )}
                    </form>

                    <div className="pb-5">
                        <h1 className="text-3xl font-black text-white">
                            {data?.user?.name ?? "Account"}
                        </h1>

                        <p className="text-slate-200">
                            {isAdmin
                                ? "Event Organizer & Administrator"
                                : "Event Participant"}
                        </p>
                    </div>
                </div>
            </div>
            {/* Top Actions */}

            <div className="flex justify-end">
                <button className="bg-cyan-500 hover:bg-cyan-400 px-6 py-3 rounded-xl font-semibold flex items-center gap-3">
                    <FaEdit />
                    Edit Profile
                </button>
            </div>

            {/* Stats */}

            <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                    <FaCalendarAlt className="text-cyan-400 text-3xl mb-4" />
                    <h3 className="text-3xl font-black">
                        {isAdmin ? "48" : "12"}
                    </h3>
                    <p className="text-slate-400">
                        {isAdmin ? "Events Created" : "Events Joined"}
                    </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                    <FaTicketAlt className="text-green-400 text-3xl mb-4" />
                    <h3 className="text-3xl font-black">
                        {isAdmin ? "8.4K" : "24"}
                    </h3>
                    <p className="text-slate-400">
                        {isAdmin ? "Tickets Sold" : "Tickets Booked"}
                    </p>
                </div>

                {/* <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                    <FaUsers className="text-purple-400 text-3xl mb-4" />
                    <h3 className="text-3xl font-black">
                        {isAdmin ? "2.5K" : "125"}
                    </h3>
                    <p className="text-slate-400">
                        {isAdmin ? "Attendees" : "Connections"}
                    </p>
                </div> */}

                {/* <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                    <FaCheckCircle className="text-yellow-400 text-3xl mb-4" />
                    <h3 className="text-3xl font-black">
                        {isAdmin ? "96%" : "100%"}
                    </h3>
                    <p className="text-slate-400">
                        {isAdmin ? "Success Rate" : "Attendance"}
                    </p>
                </div> */}
            </div>

            {/* Profile Details */}

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left */}

                <div className="space-y-6">

                    {/* Contact */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                        <h2 className="text-xl font-bold mb-5">
                            Contact Information
                        </h2>

                        <div className="space-y-4">
                            <div className="flex gap-3 items-center">
                                <FaEnvelope className="text-cyan-400" />
                                <span>{data?.user?.email}</span>
                            </div>

                            <div className="flex gap-3 items-center">
                                <FaPhone className="text-green-400" />
                                <span>+91 {data?.user?.phone}</span>
                            </div>

                            <div className="flex gap-3 items-center">
                                <FaMapMarkerAlt className="text-red-400" />
                                <span>{data?.user?.address}</span>
                            </div>

                            <div className="flex gap-3 items-center">
                                <FaGlobe className="text-purple-400" />
                                <span>www.eventhub.com</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right */}

                <div className="lg:col-span-2">
                    {/* Personal Info */}

                    <PersonalInfo />

                    {/* Activity Timeline */}

                </div>
            </div>
        </div>
    );
};

export default Profile;

function PersonalInfo() {

    const { data, setData } = useAuthContext();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        defaultValues: {
            name: data?.user?.name,
            email: data?.user?.email,
            phone: data?.user?.phone,
            address: data?.user?.address,
            gender: data?.user?.gender
        }
    });

    const updateinfo = async (formData) => {
        try {
            let updatedUser = await updateUserInfo(formData);
            setData((currentData) => ({
                ...currentData,
                user: updatedUser,
            }));
        } catch (error) {
            console.log(error)
        }
    }

    return (<>
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">
                Personal Information
            </h2>
            <form onSubmit={handleSubmit(updateinfo)}>
                <div className="grid md:grid-cols-2 gap-5">
                    <div>
                        <input
                            type="text"
                            defaultValue={data?.user?.name}
                            className="bg-slate-900 border border-white/10 rounded-xl p-4"
                            {...register("name", { required: true })}
                        />
                        {errors.name && <p className="text-red-500">Name is required</p>}
                    </div>
                    <div>
                        <input
                            type="email"
                            defaultValue={data?.user?.email}
                            className="bg-slate-900 border border-white/10 rounded-xl p-4"
                            {...register("email", { required: true })}
                        />
                        {errors.email && <p className="text-red-500">email is required</p>}
                    </div>

                    <div>
                        <input
                            type="text"
                            defaultValue={data?.user?.phone}
                            className="bg-slate-900 border border-white/10 rounded-xl p-4"
                            placeholder="Phone Number"
                            {...register("phone", { required: true })}
                        />
                        {errors.phone && <p className="text-red-500">phone is required</p>}
                    </div>

                    <div>
                        <input
                            type="text"
                            defaultValue="Indore"
                            className="bg-slate-900 border border-white/10 rounded-xl p-4"
                            {...register("address", { required: true })}
                        />
                        {errors.address && <p className="text-red-500">address is required</p>}
                    </div>

                    <div>
                        <select
                            className="bg-slate-900 border border-white/10 rounded-xl p-4"
                            {...register("gender", { required: true })}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">other</option>
                        </select>
                        {errors.gender && <p className="text-red-500">gender is required</p>}
                    </div>
                </div >

                <button className="mt-6 bg-cyan-500 hover:bg-cyan-400 px-6 py-3 rounded-xl font-semibold cursor-pointer">
                    Save Changes
                </button>
            </form >
        </div >
    </>)
}
