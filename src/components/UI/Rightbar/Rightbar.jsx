import { FaSearch, FaEllipsisH, FaVideo, FaCircle } from "react-icons/fa";

export default function Rightbar() {
  const sponsoredAds = [
    { title: "Tech Gadgets Store", subtitle: "techgadgets.com", img: "T" },
    { title: "Learn React Now", subtitle: "reactcourse.io", img: "R" },
  ];

  const contacts = [
    { name: "John Doe", online: true },
    { name: "Jane Smith", online: true },
    { name: "Mike Johnson", online: false },
    { name: "Sarah Williams", online: true },
    { name: "Alex Brown", online: false },
    { name: "Emily Davis", online: true },
    { name: "Chris Wilson", online: true },
    { name: "Lisa Anderson", online: false },
  ];

  const groupConversations = [
    { name: "Dev Team", members: 5 },
    { name: "Family Group", members: 8 },
    { name: "College Friends", members: 12 },
  ];

  return (
    <aside className="hidden lg:block fixed right-0 top-14 lg:w-56 xl:w-72 2xl:w-80 h-[calc(100vh-56px)] overflow-y-auto p-2 xl:p-3 scrollbar-thin">
      {/* Sponsored Section */}
      <div className="mb-4">
        <h3 className="text-gray-500 font-semibold text-sm mb-3">Sponsored</h3>
        {sponsoredAds.map((ad, index) => (
          <div
            key={index}
            className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors"
          >
            <div className="w-20 h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-lg bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xl lg:text-2xl xl:text-3xl font-bold">
                {ad.img}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-gray-800 text-xs lg:text-sm font-medium truncate">
                {ad.title}
              </p>
              <p className="text-gray-500 text-xs truncate">{ad.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <hr className="my-3 border-gray-300" />

      {/* Contacts Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-gray-500 font-semibold text-sm">Contacts</h3>
          <div className="flex gap-3">
            <button className="text-gray-500 hover:text-gray-700 transition-colors">
              <FaVideo />
            </button>
            <button className="text-gray-500 hover:text-gray-700 transition-colors">
              <FaSearch />
            </button>
            <button className="text-gray-500 hover:text-gray-700 transition-colors">
              <FaEllipsisH />
            </button>
          </div>
        </div>

        {/* Contact List */}
        {contacts.map((contact, index) => (
          <button
            key={index}
            className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded-lg transition-colors w-full text-left"
          >
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {contact.name.charAt(0)}
                </span>
              </div>
              {contact.online && (
                <FaCircle className="absolute bottom-0 right-0 text-green-500 text-xs bg-white rounded-full" />
              )}
            </div>
            <span className="text-gray-800 text-sm font-medium">
              {contact.name}
            </span>
          </button>
        ))}
      </div>

      {/* Divider */}
      <hr className="my-3 border-gray-300" />

      {/* Group Conversations */}
      <div>
        <h3 className="text-gray-500 font-semibold text-sm mb-3">
          Group Conversations
        </h3>
        {groupConversations.map((group, index) => (
          <button
            key={index}
            className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded-lg transition-colors w-full text-left"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {group.name.charAt(0)}
              </span>
            </div>
            <span className="text-gray-800 text-sm font-medium">
              {group.name}
            </span>
          </button>
        ))}

        {/* Create New Group */}
        <button className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded-lg transition-colors w-full">
          <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-700 text-xl">+</span>
          </div>
          <span className="text-gray-800 text-sm font-medium">
            Create New Group
          </span>
        </button>
      </div>
    </aside>
  );
}
