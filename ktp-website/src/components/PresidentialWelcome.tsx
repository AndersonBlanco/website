import president from '../img/PresidentWelcome.jpg';

const PresidentialWelcome = () => {
  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Image on the left */}
        <img
          src={president}
          alt="Presidential Welcome"
          className="w-full max-w-sm md:max-w-md lg:max-w-lg h-auto max-h-[530px] rounded-lg object-contain"
        />

        {/* Text on the right */}
        <div className="text-center md:text-left max-w-2xl">
          <h2 className="text-center text-3xl sm:text-4xl font-black text-ktp-appblue mb-6">
            Presidential Welcome
          </h2>

          <div className="px-4 md:px-0 space-y-6">
            <p className="mb-4 hover:scale-[1.02] transition-all duration-200 ease-in-out">
              Welcome to the Lambda Chapter of Kappa Theta Pi! Laurel and I are so excited to be your co-presidents for Fall 2026! Our time in KTP has been such a rewarding experience, and we are beyond honored to represent our brothers this upcoming semester.
            </p>

            <p className="mb-4 hover:scale-[1.02] transition-all duration-200 ease-in-out">
              KTP is the nation’s first co-ed technology fraternity. Founded at the University of Michigan in 2012, it was started with the mission to create a tech community that enthusiastic students could join. Our Lambda chapter was founded in September 2022, fostering a tight-knit community centered on the love of technology while providing opportunities for professional and technical development, connections with a vast alumni network, academic support, and social growth at BU.
            </p>

            <p className="mb-4 hover:scale-[1.02] transition-all duration-200 ease-in-out">
              We are open to ALL majors; we have brothers studying everything from Business or Data Science to Film and TV or Biology. Our chapter has athletes, researchers, creators, leaders, and more, all united by our passion for technology.
            </p>

            <p className="mb-4 hover:scale-[1.02] transition-all duration-200 ease-in-out">
              To prospective members, thank you for your interest, and we are so excited to meet you during recruitment. We encourage you to visit our recruitment page to learn more about the rush process and what KTP can offer you. Please also check out our Instagram: 
              <a
                href="https://www.instagram.com/ktpbostonu/"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline hover:text-blue-800 ml-1"
              >
                @ktpbostonu
              </a>!
            </p>

            <p className="mb-4 hover:scale-[1.02] transition-all duration-200 ease-in-out">
              We can’t wait to welcome you into our brotherhood and see you soon!
            </p>

            <p className="mb-1">Best,</p>
            <p className="mb-1">Laurel Purcell and Peter Emero</p>
            <p className="mb-1 italic text-gray-700">Lambda Chapter Co-Presidents</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PresidentialWelcome;
