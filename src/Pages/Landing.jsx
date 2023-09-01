import { Link } from "react-router-dom"
import { LandingCard } from '../Components'
import { CARDS } from '../Constants'

const Landing = () => {
  return (
    <div className="landing text-white">
      <nav className="sticky top-0 z-20 bg-blue-300 bg-opacity-20 backdrop-blur-md p-1">
        <div className="flex items-center gap-3 ml-5">
          <img
            width={70}
            className="rounded-3xl"
            src="/logo-min.png"
            alt="logo"
          />
          <h3 className="text-4xl font-bold font-serif text-blue-100">
            Wider<span className="text-blue-300">AI</span>
          </h3>
        </div>
      </nav>

      <main className="mt-8 md:mt-24 ml-10 md:ml-20 grid lg:grid-cols-2">
        <div className="p-5">
          <p className="p-1 px-3 rounded-xl bg-slate-700 max-w-fit opacity-60">
            WiderAI Speaking Assistant
          </p>
          <h1 className="landing-title">
            WiderAI - <br /> We dominate!
          </h1>
          <p className="landing-desc">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere id
            laborum eveniet eum debitis neque dolorum, veritatis provident
            placeat culpa nihil omnis officiis quo. Neque cumque voluptatem
            voluptatum inventore voluptatibus.
          </p>
          <Link to={"/test"} className="landing-button">
            Start speaking test
          </Link>
        </div>
      </main>
      <section className="p-16 md:p-28">
        <div className=" flex items-center justify-center md:justify-between flex-wrap">
          {CARDS.map((i, ind) => (
            <LandingCard key={ind} image={i.image} title={i.title} desc={i.desc}/>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Landing
