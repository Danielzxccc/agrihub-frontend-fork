import MaintenanceIllustration from "@icons/MaintenanceIllustration";

const Maintenance = () => {
  return (
    <section className="bg-white h-auto">
      <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
        <div className="wf-ull lg:w-1/2">
          <p className="text-sm font-bold text-red-500 dark:text-red-400">
            Maintenance Mode
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800  md:text-3xl">
            AgriHub is Under Maintenance
          </h1>
          <p className="mt-4 text-gray-500">
            We're currently performing maintenance on our website to provide you
            with a better experience. Please check back later.
          </p>
        </div>

        <div className="relative w-full lg:w-1/2 lg:mt-0">
          <div className="w-full ounded-lg object-cover">
            <MaintenanceIllustration />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Maintenance;