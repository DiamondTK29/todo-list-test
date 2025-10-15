import React from 'react';
import { FilterType } from '../types';

interface FilterButtonsProps {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  activeCount: number;
}

// Карта для отображения текста на кнопках
const filterMap: { [key in FilterType]: string } = {
  all: 'Все',
  active: 'Активные',
  completed: 'Выполненные',
};

const FilterButtons: React.FC<FilterButtonsProps> = ({ filter, setFilter, activeCount }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-50 rounded-xl shadow-md mt-6">

      {/* Подсчет активных задач */}
      <div className="text-gray-600 font-medium mb-3 sm:mb-0">
        Осталось: <span className="text-indigo-600 font-bold">{activeCount}</span> {activeCount === 1 ? 'задача' : 'задач'}
      </div>

      {/* Кнопки фильтрации */}
      <div className="flex space-x-3">
        {(['all', 'active', 'completed'] as FilterType[]).map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`
              px-4 py-2 text-sm font-semibold rounded-lg transition duration-200
              ${filter === type
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-300'
              }
            `}
            aria-pressed={filter === type}
          >
            {filterMap[type]}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterButtons;
