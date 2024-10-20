import SunIcon from "../icons/sun";
import HumidityIcon from "../icons/humidity";
import PrecipitationIcon from "../icons/precipitation";
import ResponsiveSection from "./sectionResponsive";

export default function Summary() {
  return (
    <>
      <article className="w-full rounded-md border-[1.5px] border-neutral-300 px-4 ">
        <h2 className="text-xl font-semibold py-2 bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-sky-600 inline-flex items-center gap-1">
          <span className="font-light">Bienvenido</span> Andres
        </h2>
        <ResponsiveSection></ResponsiveSection>
      </article>
    </>
  );
}
