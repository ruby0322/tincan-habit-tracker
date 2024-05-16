import Navbar from "@/components/navbar";

const ExperimentalLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <Navbar />
      <div className='w-full flex items-center justify-center h-[calc(100vh-64px)] overflow-auto'>
        {children}
      </div>
    </>
  );
};

export default ExperimentalLayout;
