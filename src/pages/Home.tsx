import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <section className="grid gap-4 px-8 md:w-4/6 mx-auto">
      <h1 className="text-2xl">Join Our Team Today!</h1>
      <h3 className="font-light">
        "We're looking for talented, passionate individuals to make an impact.
        If you're ready to grow, innovate, and contribute, apply now and become
        part of something great!"
      </h3>

      <button
        className="bg-gray-600 shadow-sm md:w-1/6 mx-auto rounded-md px-4 py-2 text-white hover:bg-gray-800"
        onClick={() => {
          navigate("/dashboard");
        }}
      >
        Apply Now!
      </button>
    </section>
  );
};

export default Home;
