"use client"

import { useEffect, useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import {
  HELP_CATEGORIES,
  HELP_DEPOSIT_METHODS,
  HELP_FAQ_BY_CATEGORY,
  type HelpCategoryId,
  type HelpDepositMethod,
} from "@/data/help"
import {
  depositMethodMatches,
  faqItemMatches,
  isHelpMobileViewport,
} from "@/lib/help-search"
import { HelpVideoDrawer } from "@/components/help/help-video-drawer"
import { HelpHeroSection } from "@/components/help/help-hero-section"
import { HelpCategoryNav } from "@/components/help/help-category-nav"
import { HelpMobilePanelHeader } from "@/components/help/help-mobile-panel-header"
import { HelpDepositMethodList } from "@/components/help/help-deposit-method-list"
import { HelpFaqSection } from "@/components/help/help-faq-section"
import { HelpPanelToolbar } from "@/components/help/help-panel-toolbar"

export function HelpCenterContent() {
  const [categoryId, setCategoryId] = useState<HelpCategoryId>("deposit")
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false)
  const [globalSearch, setGlobalSearch] = useState("")
  const [panelSearch, setPanelSearch] = useState("")
  const [drawerMethod, setDrawerMethod] = useState<HelpDepositMethod | null>(null)

  useEffect(() => {
    setPanelSearch("")
  }, [categoryId])

  useEffect(() => {
    if (mobileCategoryOpen) window.scrollTo({ top: 0, behavior: "smooth" })
  }, [mobileCategoryOpen])

  const openCategory = (id: HelpCategoryId) => {
    setCategoryId(id)
    if (isHelpMobileViewport()) setMobileCategoryOpen(true)
  }

  const closeMobileCategory = () => setMobileCategoryOpen(false)

  const g = globalSearch.trim()
  const p = panelSearch.trim()

  const filteredDepositMethods = useMemo(() => {
    return HELP_DEPOSIT_METHODS.filter((m) => depositMethodMatches(m, g) && depositMethodMatches(m, p))
  }, [g, p])

  const filteredFaq = useMemo(() => {
    if (categoryId === "deposit") return []
    const list = HELP_FAQ_BY_CATEGORY[categoryId]
    return list.filter((item) => faqItemMatches(item, g) && faqItemMatches(item, p))
  }, [categoryId, g, p])

  const activeCategory = HELP_CATEGORIES.find((c) => c.id === categoryId)!

  return (
    <>
      <HelpHeroSection
        globalSearch={globalSearch}
        onGlobalSearchChange={setGlobalSearch}
        hideOnMobile={mobileCategoryOpen}
      />

      <section className=" pb-16 md:pb-20  rounded-[40px] bg-[linear-gradient(180deg,var(--neutral-300,rgba(236,240,243,0.7))_0%,var(--background-body,rgba(243,244,247,0.7))_100%)] ">
       <div className="container">
         <div className="overflow-hidden px-4 py-8 md:px-6 md:py-10">
           <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
             <aside
                 className={cn(
                     "w-full shrink-0 lg:w-[292px]",
                     mobileCategoryOpen && "max-lg:hidden",
                 )}
             >
               <HelpCategoryNav activeId={categoryId} onSelect={openCategory} />
             </aside>

             <div
                 className={cn(
                     "min-w-0 flex-1",
                     !mobileCategoryOpen && "max-lg:hidden",
                 )}
             >
               <HelpMobilePanelHeader
                   categoryTitle={activeCategory.title}
                   onBack={closeMobileCategory}
               />

               {categoryId === "deposit" ? (
                   <>
                     <div className="mb-6 hidden lg:block">
                       <HelpPanelToolbar
                           title={activeCategory.title}
                           searchValue={panelSearch}
                           onSearchChange={setPanelSearch}
                           placeholder="Yöntemlerde ara"
                           ariaLabel="Yöntemlerde ara (yalnızca bu sekme)"
                       />
                     </div>
                     <HelpDepositMethodList
                         methods={filteredDepositMethods}
                         onSelectMethod={setDrawerMethod}
                     />
                   </>
               ) : (
                   <HelpFaqSection
                       categoryTitle={activeCategory.title}
                       panelSearch={panelSearch}
                       onPanelSearchChange={setPanelSearch}
                       items={filteredFaq}
                   />
               )}
             </div>
           </div>
         </div>
       </div>
      </section>

      <HelpVideoDrawer
        open={drawerMethod != null}
        onOpenChange={(open) => {
          if (!open) setDrawerMethod(null)
        }}
        method={drawerMethod}
      />
    </>
  )
}
