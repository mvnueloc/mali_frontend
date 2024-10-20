import React, { useState, useEffect, useCallback } from "react";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import ReactMarkdown from "react-markdown";

const Spinner = () => (
  <div className="flex justify-center items-center py-4">
    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
  </div>
);

const Card = ({ title, content }) => (
  <div className="bg-white p-6 rounded-lg h-full">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p>{content}</p>
  </div>
);

export default function Actions() {
  const [actionList, setActionList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setActionList([
        {
          id: 1,
          title: "Pensión Bienestar",
          content:
            "- **Beneficio:** 6,000 pesos bimestrales\n- **Inscripción:** 07/10 - 30/11\n- **Documentos:** INE, acta, CURP, domicilio\n- **Dónde:** Web Secretaría de Bienestar",
        },
        {
          id: 2,
          title: "Salud Casa por Casa",
          content:
            "- **Inicio:** Febrero 2025\n- **Servicio:** Atención médica domiciliaria\n- **Registro:** 07/10 - 30/12/2024\n- **Requisitos:** INE, CURP, domicilio",
        },
        {
          id: 3,
          title: "Documentos Clave",
          content:
            "**Mantén actualizados:**\n- INE\n- Acta de nacimiento\n- CURP\n- Comprobante de domicilio",
        },
        {
          id: 4,
          title: "Mantente Informado",
          content:
            "**Visita:**\n- [programasparaelbienestar.gob.mx](https://programasparaelbienestar.gob.mx)\n- [facebook.com/apoyosbienestar](https://facebook.com/apoyosbienestar)",
        },
      ]);
      setIsLoading(false);
    }, 1500);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === actionList.length - 1 ? 0 : prevIndex + 1
    );
  }, [actionList.length]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? actionList.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    if (!isLoading) {
      const intervalId = setInterval(nextSlide, 5000);
      return () => clearInterval(intervalId);
    }
  }, [isLoading, nextSlide]);

  return (
    <article className="w-full rounded-md border-[1.5px] border-neutral-300 p-4">
      <h2 className="text-xl font-semibold mb-6 md:mb-10">Recomendaciones</h2>
      <div className="relative">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <div className="overflow-hidden">
              {" "}
              {/* Added horizontal margin */}
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}>
                {actionList.map((action) => (
                  <div
                    key={action.id}
                    className="w-full flex-shrink-0 ">
                    <div className="bg-white p-6 rounded-lg h-full">
                      <div className="flex space-x-3 ">
                        <h3 className="text-lg font-semibold mb-2">
                          <ReactMarkdown>{action.title}</ReactMarkdown>
                        </h3>
                        <div className="h-3 w-3">
                          <span class="animate-ping inline-flex justify-center items-center h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                        </div>
                      </div>

                      <ReactMarkdown>{action.content}</ReactMarkdown>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="flex justify-center items-center">
        <img
          className="w-10/12 md:w-1/2 mx-6 rounded-md"
          src="/ESCALABILIIDAD.png"
          alt="CREDENCIAL DE ELECTOR NACIONAL"
        />
      </div>
    </article>
  );
}
