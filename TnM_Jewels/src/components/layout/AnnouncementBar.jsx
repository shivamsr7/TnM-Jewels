import {
  Gem,
  ShieldCheck,
  Truck,
  MessageCircle,
} from "lucide-react";

const announcements = [
  {
    icon: <Gem size={16} />,
    text: "Premium Quality",
  },
  {
    icon: <ShieldCheck size={16} />,
    text: "Anti Tarnish",
  },
  {
    icon: <Truck size={16} />,
    text: "Cash on Delivery",
  },
  {
    icon: <MessageCircle size={16} />,
    text: "Order on WhatsApp",
  },
];

export default function AnnouncementBar() {
  return (
    <div className="bg-black text-white">

      <div className="max-w-7xl mx-auto">

        <div className="h-10 flex justify-center items-center gap-8 text-sm">

          {announcements.map((item) => (

            <div
              key={item.text}
              className="flex items-center gap-2 text-gray-200"
            >
              <span className="text-yellow-500">
                {item.icon}
              </span>

              {item.text}

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}