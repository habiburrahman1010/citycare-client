import { FaCity, FaTasks, FaUsers, FaMoneyBillWave, FaChartLine, FaShieldAlt } from "react-icons/fa";

const features = [
  {
    title: "Report City Issues",
    desc: "Citizens can easily report road, water, electricity and other city problems with photos and location.",
    icon: <FaCity />,
  },
  {
    title: "Track Issue Status",
    desc: "Follow your submitted issues in real-time from pending to resolved with full transparency.",
    icon: <FaTasks />,
  },
  {
    title: "Staff Assignment",
    desc: "Admins assign the right staff to the right problem ensuring faster and smarter solutions.",
    icon: <FaUsers />,
  },
  {
    title: "Secure Payments",
    desc: "Pay service fees safely and track your payment history directly inside the system.",
    icon: <FaMoneyBillWave />,
  },
  {
    title: "Analytics Dashboard",
    desc: "Admins and staff view charts, statistics and performance reports to improve city services.",
    icon: <FaChartLine />,
  },
  {
    title: "Role Based Access",
    desc: "Citizen, Staff and Admin roles ensure secure and controlled access to every feature.",
    icon: <FaShieldAlt />,
  },
];

const FeaturesSection = () => {
  return (
    <div className="bg-base-200 py-16">
      <div className="max-w-7xl mx-auto px-4">

        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Why Use CityCare?
        </h2>

        <p className="text-center text-gray-500 max-w-2xl mx-auto mb-12">
          CityCare helps citizens, staff and administrators work together to solve city problems faster, smarter and more transparently.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-base-100 p-6 rounded-xl shadow hover:shadow-lg transition text-center"
            >
              <div className="text-4xl text-primary mb-4 flex justify-center">
                {feature.icon}
              </div>

              <h3 className="font-bold text-lg mb-2">
                {feature.title}
              </h3>

              <p className="text-gray-500 text-sm">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default FeaturesSection;
