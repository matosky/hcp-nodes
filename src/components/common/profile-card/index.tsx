import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, MoreHorizontal } from "lucide-react";
import { useHCP } from "@/context/hcp-context";

export const ProfileCard = () => {
  const { selectedHCP, setSelectedHCP } = useHCP();

  return (
    <Card className="w-full overflow-scroll max-w-md mx-auto  bg-white">
      {/* Header with world map and floating avatars */}
      <div className="relative h-32 bg-gradient-to-br from-blue-50 to-purple-50 rounded-t-lg overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <svg viewBox="0 0 400 120" className="w-full h-full">
            {/* Simplified world map paths */}
            <path
              d="M50 60 Q100 40 150 60 T250 60 Q300 40 350 60"
              fill="none"
              stroke="#e0e7ff"
              strokeWidth="2"
            />
            <path
              d="M30 80 Q80 60 130 80 T230 80 Q280 60 330 80"
              fill="none"
              stroke="#e0e7ff"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Floating mini avatars */}
        <Avatar className="absolute top-4 left-8 w-8 h-8 border-2 border-white">
          <AvatarImage src="/placeholder.svg?height=32&width=32" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <Avatar className="absolute top-6 right-12 w-8 h-8 border-2 border-white">
          <AvatarImage src="/placeholder.svg?height=32&width=32" />
          <AvatarFallback>SM</AvatarFallback>
        </Avatar>
        <Avatar className="absolute top-2 right-20 w-6 h-6 border-2 border-white">
          <AvatarImage src="/placeholder.svg?height=24&width=24" />
          <AvatarFallback>AL</AvatarFallback>
        </Avatar>
        <Avatar className="absolute bottom-4 left-16 w-6 h-6 border-2 border-white">
          <AvatarImage src="/placeholder.svg?height=24&width=24" />
          <AvatarFallback>MK</AvatarFallback>
        </Avatar>
        <Avatar className="absolute bottom-6 right-8 w-8 h-8 border-2 border-white">
          <AvatarImage src="/placeholder.svg?height=32&width=32" />
          <AvatarFallback>RJ</AvatarFallback>
        </Avatar>
      </div>

      <CardContent className="p-6">
        {/* Main profile section */}
        <div className="flex flex-col items-center -mt-12 mb-6">
          <Avatar className="w-24 h-24 border-4 border-white shadow-lg mb-4">
            <AvatarImage
              src={selectedHCP?.image || selectedHCP?.fallbackImage}
              alt={selectedHCP?.image || selectedHCP?.fallbackImage}
            />
            <AvatarFallback>EC</AvatarFallback>
          </Avatar>

          <h2 className="text-xl font-semibold text-gray-900 mb-1">
            {selectedHCP?.name}
          </h2>

          <div className="flex items-center gap-2 mb-3">
            <Badge
              variant="secondary"
              className="bg-blue-100 text-blue-700 hover:bg-blue-100"
            >
              {selectedHCP?.specialization}
            </Badge>
            <Badge
              variant="secondary"
              className="bg-gray-100 text-gray-600 hover:bg-gray-100"
            >
              25 years
              {selectedHCP?.yearsOfExperience}
            </Badge>
          </div>

          <p className="text-sm text-gray-600 text-center mb-4">
            {selectedHCP?.headline}
          </p>

          {/* Social stats */}
          <div className="flex gap-8 mb-4">
            <div className="text-center">
              <div className="text-sm text-gray-500">Peers</div>
              <div className="font-semibold">{selectedHCP?.peers}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">Following</div>
              <div className="font-semibold">{selectedHCP?.connectionRate}</div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 w-full mb-6">
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
              View Profile
            </Button>
            <Button
              variant="outline"
              className="bg-white text-gray-700 border-gray-300"
            >
              Resume
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-sm text-gray-500 mb-1">
              Patient Served
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {selectedHCP?.patientServed?.noOfPatients}
            </div>
            <div className="flex items-center justify-center gap-1 text-green-600 text-xs">
              <TrendingUp className="h-3 w-3" />
              +7%
            </div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-sm text-gray-500 mb-1">
              Success rate
            </div>
            <div className="text-2xl font-bold text-gray-900">{selectedHCP?.successRate?.rate}%</div>
            <div className="flex items-center justify-center gap-1 text-green-600 text-xs">
              <TrendingUp className="h-3 w-3" />
              +2%
            </div>
          </div>
        </div>

        {/* About section */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">About</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {selectedHCP?.bio}
          </p>
        </div>

        {/* Education section */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Education</h3>
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <div className="w-6 h-6 bg-blue-600 rounded"></div>
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">
                {selectedHCP?.education}
              </h4>
              <p className="text-sm text-gray-600">Cardiology Degree</p>
              <p className="text-sm text-gray-600">
                {selectedHCP?.specialization}
              </p>
              <p className="text-xs text-gray-500 mt-1">Sep 2015 - Jun 2020</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
