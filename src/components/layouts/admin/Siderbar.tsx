"use client";
import { useEffect } from 'react'
import { useSidebarStore } from "@/store/useSidebarStore";
import { Home, Users, ChevronDown, ChevronRight, Music4, Network, FileText, X, CalendarDays } from 'lucide-react'
import { useRouter } from 'next/navigation'
import ActiveLink from '@/components/ui/activeLink';

export default function Sidebar() {
  const { sidebarOpen, setSidebarOpen, activeSubmenu, setActiveSubmenu } = useSidebarStore();
  const router = useRouter();

  const menuItems = [
    { name: 'Início', icon: Home, link: '/admin', subItems: [] },
    { name: 'Escalas', icon: CalendarDays, link: '/admin/escalas', subItems: [] },
    { name: 'Músicas', icon: Music4, link: '/admin/musicas', subItems: [{ name: 'Listar Músicas', link:'/admin/musicas' }, { name: 'Adicionar Músicas', link:'/admin/musicas/adicionar' }] },
    { name: 'Formações', icon: Network, link: '/admin/formacoes', subItems: [] },
    { name: 'Funções', icon: FileText, link: '/admin/funcoes', subItems: [] },
    { name: 'Usuários', icon: Users, link: '/admin/usuarios', subItems: [{ name: 'Listar Usuários', link:'/admin/usuarios' }, { name: 'Adicionar Usuários', link:'/admin/usuarios/adicionar' }] },
  ]

  const toggleSubmenu = (index: number) => {
    setActiveSubmenu(activeSubmenu === index ? null : index)
  }

  const redirectionPage = (href: string) => {    
    router.push(href)
  }

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1023px)')

    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setSidebarOpen(false)
      }
    }

    mediaQuery.addEventListener('change', handleMediaQueryChange)

    // Initial check
    if (mediaQuery.matches) {
      setSidebarOpen(false)
    }

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange)
    }
  }, [])

  return (
    <>
      <aside
        className={`
                  fixed inset-y-0 left-0 z-50 bg-gradient-to-b from-purple-900 to-orange-400 text-white transition-all duration-300 ease-in-out
                  overflow-y-auto custom-scrollbar
                  lg:relative lg:translate-x-0
                  ${sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full w-20 lg:translate-x-0 lg:w-20'}
                `}
      >
        <div className="flex items-center justify-between p-4 border-b border-purple-800">
          <h2 className={`text-xl font-bold transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 lg:opacity-0'}`}>Onda Dura</h2>
          <button onClick={toggleSidebar} className="lg:hidden ">
            <X size={24} />
          </button>
        </div>
        <nav className="p-4">
          {menuItems.map((item, index) => (
            <div key={item.name} className="mb-4">
              <button
                onClick={() => {item.subItems.length > 0 && sidebarOpen ? toggleSubmenu(index) : redirectionPage(item.link)}}
                className={`w-full flex items-center justify-between p-2 rounded transition duration-200 hover:bg-orange-500 ${!sidebarOpen && 'lg:justify-center'}`}
              >
                <div className="flex items-center">
                  <item.icon className="mr-2" size={20} />
                  <span className={`transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 w-0 lg:opacity-0'}`}>{item.name}</span>
                </div>
                {item.subItems.length > 0 && sidebarOpen && (
                  activeSubmenu === index ? <ChevronDown size={16} /> : <ChevronRight size={16} />
                )}
              </button>
              {activeSubmenu === index && item.subItems.length > 0 && sidebarOpen && (
                <div className="ml-6 mt-2 space-y-2">
                  {item.subItems.map((subItem) => (
                    <div key={subItem.name} className="mb-4">
                      <ActiveLink
                        key={subItem.name}
                        href={subItem.link}
                        className="block p-2 rounded transition duration-200 hover:bg-orange-500"
                      >
                        {subItem.name}
                      </ActiveLink>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>
      <style jsx global>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(107, 114, 128, 0.5) transparent;
          direction: rtl;
        }

        .custom-scrollbar > * {
          direction: ltr;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 0px;  /* This hides the horizontal scrollbar */
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(107, 114, 128, 0.5);
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(107, 114, 128, 0.7);
        }
      `}</style>
    </>
  );
}