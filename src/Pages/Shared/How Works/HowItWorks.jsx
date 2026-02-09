import { FaUserEdit, FaMapMarkedAlt, FaUserCheck, FaTools } from "react-icons/fa";

const steps = [
    {
        step: "01",
        title: "Report an Issue",
        desc: "Citizens submit city problems like road damage, water leaks or electricity faults with photo and location.",
        icon: <FaUserEdit />,
    },
    {
        step: "02",
        title: "Admin Reviews",
        desc: "Admins verify the issue and assign the right staff based on category and priority.",
        icon: <FaUserCheck />,
    },
    {
        step: "03",
        title: "Staff Resolves",
        desc: "Staff members work on the issue and update the progress until it is fully resolved.",
        icon: <FaTools />,
    },
    {
        step: "04",
        title: "Track & Confirm",
        desc: "Citizens track progress and confirm satisfaction once the issue is completed.",
        icon: <FaMapMarkedAlt />,
    },
];

const HowItWorks = () => {
    return (
        <div className="bg-base-100 py-16">
            <div className="max-w-7xl mx-auto px-4">

                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                    How CityCare Works
                </h2>

                <p className="text-center text-gray-500 max-w-2xl mx-auto mb-12">
                    CityCare connects citizens, staff and administrators in a simple workflow to solve city issues efficiently.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((item, index) => (
                        <div
                            key={index}
                            className="bg-base-200 p-6 rounded-xl shadow hover:shadow-lg transition text-center relative"
                        >
                            <div className="text-4xl text-primary mb-4 flex justify-center">
                                {item.icon}
                            </div>

                            <h3 className="font-bold text-lg mb-2">
                                {item.title}
                            </h3>

                            <p className="text-gray-500 text-sm">
                                {item.desc}
                            </p>
                        </div>

                    ))}
                </div>

            </div>
        </div>
    );
};

export default HowItWorks;
