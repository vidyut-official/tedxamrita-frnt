export default function SpeakerCard({
  image,
  name,
  role,
  align,
}: {
  image: string;
  name: string;
  role: string;
  align: "left" | "right";
}) {
  return (
    <div className={`text-${align} max-w-[220px]`}>
      <img
        src={image}
        alt={name}
        className="max-h-[300px] object-contain grayscale hover:grayscale-0 transition duration-500"
      />
      <h4 className="text-white font-bold uppercase mt-4 text-lg">
        {name}
      </h4>
      <p className="text-red-600 text-xs uppercase tracking-widest mt-2">
        {role}
      </p>
    </div>
  );
}