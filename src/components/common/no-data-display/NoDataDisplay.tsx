import emptyBg from "@/assets/empty-bg.svg";

interface NoDataDisplayProps {
  text?: string;
  image?: string;
  inviteImg?: boolean;
}

export default function NoDataDisplay({ text, image }: NoDataDisplayProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <img src={image || emptyBg} alt="no data" />
      </div>
      <p className="mt-[2rem]">{text || "No data to display yet"}</p>
    </div>
  );
}
