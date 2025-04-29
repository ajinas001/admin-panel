import { useState } from "react";
import {
  Grid, FileText, RefreshCw, Rss, Briefcase, MapPin, HelpCircle, 
  ShoppingBag, LifeBuoy, Settings, BookOpen, Box, Shield, Lock, ChevronDown, ChevronUp
} from "lucide-react";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: "grid" },
  { id: "article", label: "Article", icon: "file-text" },
  { id: "auto-dealership", label: "Auto dealership", icon: "refresh-cw" },
  { id: "blog", label: "Blog", icon: "rss", hasSubmenu: true },
  { id: "career", label: "Career", icon: "briefcase" },
  { id: "country", label: "Country, state, city", icon: "map-pin" },
  { id: "faqs", label: "FAQ's", icon: "help-circle" },
  { id: "free-shop-news", label: "Free shop news", icon: "shopping-bag", hasSubmenu: true },
  { id: "helpcenter", label: "Help Center", icon: "life-buoy" },
  { id: "how-it-works", label: "How it works", icon: "settings", hasSubmenu: true },
  { id: "jobs", label: "Jobs", icon: "briefcase" },
  { id: "press", label: "Press", icon: "book-open" },
  { id: "product", label: "Product", icon: "box" },
  { id: "privacy-terms", label: "Privacy & Terms", icon: "shield" },
  { id: "trust-safety", label: "Trust & safety", icon: "lock", hasSubmenu: true },
];

const getIcon = (iconName) => {
  const icons = {
    grid: <Grid className="w-5 h-5" />,
    "file-text": <FileText className="w-5 h-5" />,
    "refresh-cw": <RefreshCw className="w-5 h-5" />,
    rss: <Rss className="w-5 h-5" />,
    briefcase: <Briefcase className="w-5 h-5" />,
    "map-pin": <MapPin className="w-5 h-5" />,
    "help-circle": <HelpCircle className="w-5 h-5" />,
    "shopping-bag": <ShoppingBag className="w-5 h-5" />,
    "life-buoy": <LifeBuoy className="w-5 h-5" />,
    settings: <Settings className="w-5 h-5" />,
    "book-open": <BookOpen className="w-5 h-5" />,
    box: <Box className="w-5 h-5" />,
    shield: <Shield className="w-5 h-5" />,
    lock: <Lock className="w-5 h-5" />,
  };
  return icons[iconName] || <Grid className="w-5 h-5" />;
};

const Sidebar = ({ activeComponent, setActiveComponent, isSidebarOpen, setIsSidebarOpen }) => {
  const [expandedMenus, setExpandedMenus] = useState([]);

  const toggleExpand = (id) => {
    setExpandedMenus((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-full w-64 bg-white z-30 transform transition-transform duration-300 ease-in-out ms-0 md:ms-20
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:static`}
    >
      <div className="flex flex-col h-full overflow-hidden">
        <div className="p-4">
          <img src="/images/logo.png" alt="Logo" className="h-20 w-20 rounded-full" />
        </div>

        <nav className="flex-1 overflow-y-auto px-2 no-scrollbar">
          {menuItems.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => {
                  if (item.hasSubmenu) {
                    toggleExpand(item.id);
                  } else {
                    setActiveComponent(item.id);
                    setIsSidebarOpen(false);
                  }
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-md
                  ${activeComponent === item.id ? "bg-cyan-600 text-white" : "text-gray-700 hover:bg-gray-100"}
                `}
              >
                <div className="flex items-center gap-3 font-bold">
                  {getIcon(item.icon)}
                  <span>{item.label}</span>
                </div>
                {item.hasSubmenu && (
                  expandedMenus.includes(item.id) ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                )}
              </button>

              {item.hasSubmenu && expandedMenus.includes(item.id) && (
                <div className="ml-10 mt-1 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setActiveComponent(`${item.id}-submenu-1`);
                      setIsSidebarOpen(false);
                    }}
                    className="text-gray-600 hover:text-cyan-600 text-sm text-left"
                  >
                    Submenu 1
                  </button>
                  <button
                    onClick={() => {
                      setActiveComponent(`${item.id}-submenu-2`);
                      setIsSidebarOpen(false);
                    }}
                    className="text-gray-600 hover:text-cyan-600 text-sm text-left"
                  >
                    Submenu 2
                  </button>
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
