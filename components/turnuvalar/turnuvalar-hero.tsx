import Image from "next/image"

export function TurnuvalarHero() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative w-full">
        <Image
          src="/images/sliders/turnuvalar.jpg"
          alt="Tournaments"
          priority
          width={1920}
          height={1080}
          className="mx-auto hidden object-cover object-center md:block"
          style={{ width: "100%", height: "clamp(240px,30.5vw,430px)", maxWidth: "1850px" }}
        />
        <Image
          src="/images/sliders/mobil-turnuvalar.jpg"
          alt="Tournaments"
          priority
          width={768}
          height={440}
          className="mx-auto block h-[440px] w-full max-w-[1850px] object-cover object-center md:hidden"
        />
      </div>
    </section>
  )
}
