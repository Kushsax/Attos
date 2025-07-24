"use client"

export function CategoryCard({ category, onClick, isSelected }) {
  return (
    <div
      className={`group cursor-pointer flex-shrink-0 transition-transform hover:scale-105 ${isSelected ? "ring-2 ring-indigo-500" : ""}`}
      onClick={onClick}
    >
      <div className="relative p-4 w-24 sm:w-28 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
        <div
          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-xl sm:text-2xl mb-2 shadow-sm group-hover:shadow-md transition-all mx-auto`}
        >
          {category.icon}
        </div>
        <h4 className="font-medium text-gray-800 text-xs sm:text-sm text-center leading-tight">{category.name}</h4>
      </div>
    </div>
  )
}
