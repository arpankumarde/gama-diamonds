type SocialVideoCardProps = {
  poster: string;
  video: string;
  title: string;
  price: string;
};

export default function SocialVideoCard({
  poster,
  video,
  title,
  price,
}: SocialVideoCardProps) {
  return (
    <div className="min-w-[240px] md:min-w-[280px] bg-white rounded-xl overflow-hidden shadow-sm">
      <video
        className="w-full h-[350px] md:h-[420px] object-cover"
        poster={poster}
        src={video}
        preload="auto"
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="p-3 md:p-4 text-center">
        <p className="text-[12px] md:text-[14px] mb-2 leading-5 md:leading-6 text-black">
          {title}
        </p>
        <p className="font-semibold text-[14px] md:text-[15px] text-black">
          {price}
        </p>
      </div>
    </div>
  );
}
