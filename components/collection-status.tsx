import { CircleCheck, Gamepad2, Heart, Play } from "lucide-react";

export default function CollectionStatus() {
  const statusItems = [
    {
      id: "total-games",
      title: "Total Games",
      icon: Gamepad2,
      amount: 7,
      color: "from-purple-500 to-violet-600",
    },
    {
      id: "currently-playing",
      title: "Currently Playing",
      icon: Play,
      amount: 2,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      id: "completed",
      title: "Completed",
      icon: CircleCheck,
      color: "from-blue-500 to-cyan-600",
      amount: 2,
    },
    {
      id: "wish-list",
      title: "Wishlist",
      icon: Heart,
      color: "from-pink-500 to-rose-600",
      amount: 2,
    },
  ] as const;

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {statusItems.map((status) => (
        <div
          className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
          key={status.id}
        >
          <div
            className={`absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full ${status.color} opacity-20 blur-3xl`}
          />
          <div className="relative flex items-center gap-4">
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-lg bg-linear-to-br ${status.color} text-lg text-white`}
            >
              <status.icon size={18} />
            </div>

            <div>
              <p className="font-bold font-heading text-2xl text-foreground">
                {status.amount}
              </p>
              <p className="text-muted-foreground text-sm">{status.title}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
