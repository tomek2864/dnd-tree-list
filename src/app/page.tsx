import Image from "next/image";

export default function Home() {
  return (
    <div>
      <p className="text-sm font-normal">14px 400</p>
      <p className="text-sm font-medium">14px 500</p>
      <p className="text-sm font-semibold">14px 600</p>
      <p className="text-base font-normal">16px 400</p>
      <p className="text-base font-normal">16px 500</p>
      <p className="text-base font-normal">16px 600</p>
      <p className="text-base font-normal leading-5">16px 600 l-height 20px</p>
      <p className="text-base font-normal leading-6">16px 600 l-height 24px</p>

      <p className="text-14-400">14px 400</p>
      <p className="text-16-600 leading-24">16px 600 l-height 24px</p>
      <Image
        aria-hidden
        src="/icons/ic_move-all-directions.svg"
        alt="ic_move-all-directions icon"
        width={16}
        height={16}
      />
    </div>
  );
}
